import { z } from "zod";

const getParsedEnv = (schema) => {
  const rawEnv = Object.keys(schema).reduce((acc, key) => {
    const value = process.env[key];

    return { ...acc, [key]: value };
  }, {});

  if (process.env.IS_BUILDING) return rawEnv;

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

export const createEnv = (options) => {
  const client = getParsedEnv(options.client);
  const server = getParsedEnv(options.server);

  return {
    client,
    env: {
      ...client,
      ...server,
    },
  };
};
