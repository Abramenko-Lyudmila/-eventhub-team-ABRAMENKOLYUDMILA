import {
  Catch,
  type ArgumentsHost,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { toProblem } from "./problem";

@Catch()
export class ProblemFilter implements ExceptionFilter {
  constructor(
    @InjectPinoLogger(ProblemFilter.name) private readonly logger: PinoLogger,
  ) {}

  catch(err: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const problem = toProblem(err);

    if (problem.status >= 500) {
      // стектрейс — тільки в лог, не у відповідь
      this.logger.error({ err, url: req.url }, "unhandled error");
    } else {
      // 4xx — очікувана поведінка, тому не error
      this.logger.debug({ type: problem.type, url: req.url }, "request rejected");
    }

    ctx
      .getResponse<Response>()
      .status(problem.status)
      .type("application/problem+json")
      .json({ ...problem, instance: req.originalUrl });
  }
}
