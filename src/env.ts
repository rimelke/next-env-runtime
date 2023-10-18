import { ZodType, z } from "zod";

const createEnv = <T extends { [key: string]: ZodType<any> }>(schema: T) => {
  const env = Object.keys(schema).reduce((acc, key) => {
    const value = process.env[key];

    const parsedValue = schema[key].parse(value);

    return { ...acc, [key]: parsedValue };
  }, {} as { [key in keyof T]: z.infer<T[key]> });

  return env;
};

export const getEnv = () =>
  createEnv({
    FON: z.string().optional(),
  });

export type Env = ReturnType<typeof getEnv>;
