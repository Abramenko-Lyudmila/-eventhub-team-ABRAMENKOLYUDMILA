import { HttpException } from "@nestjs/common";
import {
  EventNotFound,
  InvalidCursor,
  RequestValidationFailed,
  type ValidationIssue,
} from "./domain-errors";

// RFC 9457 Problem Details
export interface ProblemBody {
  type: string;
  title: string;
  status: number;
  detail?: string;
  errors?: ValidationIssue[];
}

export function toProblem(err: unknown): ProblemBody {
  if (err instanceof RequestValidationFailed) {
    return {
      type: "/errors/invalid-query",
      title: "Некоректний параметр запиту",
      status: 400,
      detail: err.issues.map((i) => `${i.field}: ${i.message}`).join("; "),
      errors: err.issues,
    };
  }

  if (err instanceof InvalidCursor) {
    return {
      type: "/errors/invalid-cursor",
      title: "Некоректний курсор",
      status: 400,
      detail: err.message,
    };
  }

  if (err instanceof EventNotFound) {
    return {
      type: "/errors/not-found",
      title: "Подію не знайдено",
      status: 404,
      detail: err.message,
    };
  }

  // Помилки самого Nest, напр. запит на неіснуючий маршрут
  if (err instanceof HttpException) {
    const status = err.getStatus();
    return {
      type: status === 404 ? "/errors/not-found" : "about:blank",
      title: status === 404 ? "Ресурс не знайдено" : err.message,
      status,
      detail: err.message,
    };
  }

  // Усе інше — 500. Жодних деталей назовні: стектрейс іде лише в лог.
  return { type: "about:blank", title: "Внутрішня помилка сервера", status: 500 };
}
