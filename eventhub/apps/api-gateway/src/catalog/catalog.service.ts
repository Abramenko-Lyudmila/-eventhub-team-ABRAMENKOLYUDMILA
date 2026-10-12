import { Injectable } from "@nestjs/common";
import type { Event, EventPage, ListEventsQuery } from "@eventhub/contracts";
import { EventNotFound } from "../common/problem/domain-errors";
import { EventRepository } from "./event.repository";

@Injectable()
export class CatalogService {
  constructor(private readonly repo: EventRepository) {}

  // ТИМЧАСОВО (крок 2): фільтри й пагінація з'являться на кроці 4
  async list(_query: ListEventsQuery): Promise<EventPage> {
    const items = await this.repo.find({ limit: 50 });
    return { items, nextCursor: null };
  }

  async getOne(eventId: string): Promise<Event> {
    const event = await this.repo.byId(eventId);
    if (!event) throw new EventNotFound(eventId);
    return event;
  }
}
