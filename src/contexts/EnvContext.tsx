"use client";
import { ClientEnv } from "env";
import { PropsWithChildren, createContext } from "react";

export const EnvContext = createContext({} as ClientEnv);

interface EnvProviderProps {
  env: ClientEnv;
}

export const EnvProvider = ({
  env,
  children,
}: PropsWithChildren<EnvProviderProps>) => (
  <EnvContext.Provider value={env}>{children}</EnvContext.Provider>
);
