import { Injectable } from "@nestjs/common";
import type { Event } from "@eventhub/contracts";
import { EVENTS } from "./seed";

export interface FindParams {
  city?: string;
  from?: string;
  after?: { startsAt: string; id: string };
  limit: number;
}

// Порядок: за часом початку, а за рівного часу — за id.
// Рядки ISO-8601 в UTC мають фіксовану ширину, тому порівняння рядків
// збігається з хронологічним — без new Date() і сюрпризів із часовими поясами.
function byStartThenId(a: Event, b: Event): number {
  if (a.startsAt !== b.startsAt) return a.startsAt < b.startsAt ? -1 : 1;
  if (a.id === b.id) return 0;
  return a.id < b.id ? -1 : 1;
}

@Injectable()
export class EventRepository {
  private readonly events: Event[] = [...EVENTS].sort(byStartThenId);

  // async, хоча дані в пам'яті: у роботі №3 тут з'явиться Prisma,
  // і сигнатури (а з ними сервіс і його тести) міняти не доведеться.
  async find(params: FindParams): Promise<Event[]> {
    let rows = this.events;

    if (params.city) {
      const needle = params.city.toLocaleLowerCase("uk");
      rows = rows.filter((e) => e.venue.city.toLocaleLowerCase("uk") === needle);
    }
    if (params.from) {
      rows = rows.filter((e) => e.startsAt >= `${params.from}T00:00:00Z`);
    }
    if (params.after) {
      const { startsAt, id } = params.after;
      rows = rows.filter(
        (e) => e.startsAt > startsAt || (e.startsAt === startsAt && e.id > id),
      );
    }

    // на один рядок більше, ніж просили — див. крок 4
    return rows.slice(0, params.limit + 1);
  }

  async byId(id: string): Promise<Event | undefined> {
    return this.events.find((e) => e.id === id);
  }
}
