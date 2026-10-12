import { Module } from "@nestjs/common";
import { CatalogController } from "./catalog.controller";
import { CatalogService } from "./catalog.service";
import { EventRepository } from "./event.repository";

@Module({
  controllers: [CatalogController],
  providers: [CatalogService, EventRepository],
  // EventRepository намеренно не экспортируется: другие модули ходят
  // в каталог через сервис, а не в его данные напрямую.
  exports: [CatalogService],
})
export class CatalogModule {}
