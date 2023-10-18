import { z } from "zod";
import { schema } from "./index.mjs";

type ClientSchema = typeof schema.client;
type ServerSchema = typeof schema.server;

export type ClientEnv = Partial<{
  [key in keyof ClientSchema]: z.infer<ClientSchema[key]>;
}>;

type ServerEnv = Partial<{
  [key in keyof ServerSchema]: z.infer<ServerSchema[key]>;
}>;

export function getEnv(): Promise<{
  client: ClientEnv;
  env: ClientEnv & ServerEnv;
}>;
