import { AppConfigurationClient } from "@azure/app-configuration";

const appConfigClient = new AppConfigurationClient(
  process.env.AZURE_CONNECTION_STRING
);

const getConfigFn = async () => {
  const asyncItems = appConfigClient.listConfigurationSettings({
    keyFilter: "TestApp:*",
    labelFilter: `\0,${process.env.AZURE_ENVIRONMENT_LABEL}`,
  });

  const newConfigs = [];
  for await (const item of asyncItems) {
    newConfigs.push(item);
  }

  const configs = newConfigs.reduce((acc, item) => {
    const key = item.key.replace("TestApp:", "");

    acc[key] = item.value;

    return acc;
  }, {});

  return configs;
};

let promise;
export const getConfig = () => {
  if (!promise) promise = getConfigFn();

  return promise;
};

export const refreshConfig = () => {
  promise = getConfigFn();

  return promise;
};
