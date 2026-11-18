import type { z } from "zod";

export interface ZodDtoClass<S extends z.ZodTypeAny = z.ZodTypeAny> {
  new (): z.infer<S>;
  zodSchema: S;
}

// Глобальный pipe получает значение, но не знает, какой схемой его проверять.
// Nest передаёт в pipe класс параметра (emitDecoratorMetadata), поэтому схему
// кладём в статическое поле этого класса.
export function createZodDto<S extends z.ZodTypeAny>(schema: S): ZodDtoClass<S> {
  class Dto {
    static zodSchema = schema;
  }
  return Dto as unknown as ZodDtoClass<S>;
}
