import { getEnv } from "./env/index.mjs";

/** @type {import('next').NextConfig} */
export default async () => {
  const isBuilding = process.argv.includes("build");

  if (isBuilding) process.env.IS_BUILDING = "true";
  else await getEnv();

  return {};
};
