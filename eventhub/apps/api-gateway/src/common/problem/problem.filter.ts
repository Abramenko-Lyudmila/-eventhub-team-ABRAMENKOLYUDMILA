import {
  Catch,
  Logger,
  type ArgumentsHost,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { toProblem } from "./problem";

@Catch()
export class ProblemFilter implements ExceptionFilter {
  // ТИМЧАСОВО: на кроці 6 замінимо на PinoLogger
  private readonly logger = new Logger(ProblemFilter.name);

  catch(err: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const problem = toProblem(err);

    if (problem.status >= 500) {
      // стектрейс — тільки в лог
      this.logger.error(
        `${req.method} ${req.url}: ${err instanceof Error ? err.message : String(err)}`,
        err instanceof Error ? err.stack : undefined,
      );
    } else {
      // 4xx — очікувана поведінка, не error
      this.logger.debug(`${problem.type} ${req.url}`);
    }

    ctx
      .getResponse<Response>()
      .status(problem.status)
      .type("application/problem+json")
      .json({ ...problem, instance: req.originalUrl });
  }
}
