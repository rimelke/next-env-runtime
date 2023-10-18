import { ZodType, z } from "zod";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

type EnvSchema = { [key: string]: ZodType<any> };

const getParsedEnv = <T extends EnvSchema>(
  schema: T
): Partial<{ [key in keyof T]: z.infer<T[key]> }> => {
  const rawEnv = Object.keys(schema).reduce((acc, key) => {
    const value = process.env[key];

    return { ...acc, [key]: value };
  }, {} as { [key in keyof T]: string });

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return rawEnv;

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

export const createEnv = <
  TClient extends EnvSchema,
  TServer extends EnvSchema
>(options: {
  client: TClient;
  server: TServer;
}) => {
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
