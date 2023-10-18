import { z } from "zod";
import { schema } from "./index.mjs";

type ClientSchema = typeof schema.client;
type ServerSchema = typeof schema.server;

export const client: Partial<{
  [key in keyof ClientSchema]: z.infer<ClientSchema[key]>;
}>;

export type ClientEnv = typeof client;

export const env: typeof client &
  Partial<{
    [key in keyof ServerSchema]: z.infer<ServerSchema[key]>;
  }>;
