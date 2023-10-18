import { z } from "zod";
import { createEnv } from "./tools.mjs";

export const schema = {
  client: {
    "Settings:FontColor": z.string(),
  },
  server: {
    REVALIDATE_TOKEN: z.string().default("secret"),
  },
};

export const getEnv = () => createEnv(schema);
