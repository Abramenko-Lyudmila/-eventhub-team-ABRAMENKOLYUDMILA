import { Controller, Get, Param, Query } from "@nestjs/common";
import type {
  Event,
  EventIdParam,
  EventPage,
  ListEventsQuery,
} from "@eventhub/contracts";
import { CatalogService } from "./catalog.service";

@Controller("events")
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get()
  list(@Query() query: ListEventsQuery): Promise<EventPage> {
    return this.catalog.list(query);
  }

  @Get(":eventId")
  getOne(@Param() params: EventIdParam): Promise<Event> {
    return this.catalog.getOne(params.eventId);
  }
}
