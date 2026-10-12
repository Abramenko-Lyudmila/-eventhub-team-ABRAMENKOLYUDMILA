import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CatalogModule } from "./catalog/catalog.module";
import { ProblemFilter } from "./common/problem/problem.filter";
import { HealthModule } from "./health/health.module";

/**
 * Кореневий модуль застосунку.
 *
 * У тижні 2 сюди додадуться спільні провайдери
 * (валідація конфігурації, логер, фільтр помилок).
 */
@Module({
  imports: [HealthModule, CatalogModule],
  // APP_FILTER, а не app.useGlobalFilters(): фільтру потрібен логер,
  // а об'єкт, створений через new, поза DI.
  providers: [{ provide: APP_FILTER, useClass: ProblemFilter }],
})
export class AppModule {}
