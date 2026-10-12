import { randomUUID } from "node:crypto";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";
import { CatalogModule } from "./catalog/catalog.module";
import { ProblemFilter } from "./common/problem/problem.filter";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? "info",

        // Беремо ідентифікатор клієнта/проксі, якщо він є: трасування не
        // переривається на межі сервісів. Інакше генеруємо свій.
        genReqId: (req, res) => {
          const incoming = req.headers["x-request-id"];
          const id =
            typeof incoming === "string" && incoming ? incoming : randomUUID();
          // повертаємо клієнту: зі скріншотом помилки він приносить ключ до логів
          res.setHeader("x-request-id", id);
          return id;
        },

        // Ці поля ніколи не потраплять у лог
        redact: [
          "req.headers.authorization",
          "req.headers.cookie",
          "res.headers['set-cookie']",
        ],

        // pino-pretty — інструмент розробника. У продакшні в stdout іде JSON.
        transport:
          process.env.NODE_ENV !== "production"
            ? { target: "pino-pretty", options: { singleLine: true } }
            : undefined,
      },
    }),
    HealthModule,
    CatalogModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: ProblemFilter }],
})
export class AppModule {}
