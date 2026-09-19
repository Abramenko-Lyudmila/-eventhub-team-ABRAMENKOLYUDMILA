import createClient from "openapi-fetch";
import type { paths } from "@eventhub/contracts";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4010";

export const apiClient = createClient<paths>({ baseUrl });
