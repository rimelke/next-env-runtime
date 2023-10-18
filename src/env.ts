import { z } from "zod";
import { createEnv } from "@/tools/env";

export const { client, env } = createEnv({
  client: {
    FON: z.string(),
  },
  server: {},
});

export type ClientEnv = typeof client;
