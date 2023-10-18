import { z } from "zod";
import { createEnv } from "./tools.mjs";

export const schema = {
  client: {
    FON: z.string(),
  },
  server: {
    REVALIDATE_TOKEN: z.string().default("secret"),
  },
};

export const { client, env } = createEnv(schema);
