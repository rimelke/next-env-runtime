"use client";
import type { Env } from "@/env";
import { PropsWithChildren, createContext } from "react";

export const EnvContext = createContext({} as Env);

interface EnvProviderProps {
  env: Env;
}

export const EnvProvider = ({
  env,
  children,
}: PropsWithChildren<EnvProviderProps>) => (
  <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
);
