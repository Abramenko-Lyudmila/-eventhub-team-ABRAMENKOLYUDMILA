import { InvalidCursor } from "../common/problem/domain-errors";

export interface CursorPosition {
  startsAt: string;
  id: string;
}

// Курсор непрозорий для клієнта: base64url, а не читабельний рядок.
// Щойно хтось почне його розбирати, ключ сортування вже не змінити,
// не зламавши клієнтів.
export function encodeCursor(pos: CursorPosition): string {
  return Buffer.from(`${pos.startsAt}|${pos.id}`, "utf8").toString("base64url");
}

export function decodeCursor(raw: string): CursorPosition {
  let decoded: string;
  try {
    decoded = Buffer.from(raw, "base64url").toString("utf8");
  } catch {
    throw new InvalidCursor(raw);
  }

  const parts = decoded.split("|");
  const startsAt = parts[0];
  const id = parts[1];
  if (parts.length !== 2 || !startsAt || !id) throw new InvalidCursor(raw);

  return { startsAt, id };
}
