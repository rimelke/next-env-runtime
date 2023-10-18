import { z } from "zod";
import { getConfig } from "./azure.mjs";

const getParsedEnv = (config, schema) => {
  const rawEnv = Object.keys(schema).reduce((acc, key) => {
    acc[key] = config[key];

    return acc;
  }, {});

  const result = z.object(schema).safeParse(rawEnv);

  if (result.success === false) {
    console.error(
      "\n\n❌ Invalid environment variables:",
      result.error.flatten().fieldErrors,
      "\n\n"
    );
    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const createEnv = async (options) => {
  if (process.env.IS_BUILDING)
    return {
      client: {},
      env: {},
    };

  const config = await getConfig();

  const client = getParsedEnv(config, options.client);
  const server = getParsedEnv(config, options.server);

  return {
    client,
    env: {
      ...client,
      ...server,
    },
  };
};
