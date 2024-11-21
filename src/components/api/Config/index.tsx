interface EnvVars {
  apiBaseUrl: string;
  apiKey: string;
  accessToken: string;
}

function getEnvironmentVariables(): EnvVars {
  return {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "",
    apiKey: process.env.REACT_APP_API_KEY || "",
    accessToken: process.env.REACT_APP_ACCESS_TOKEN || "",
  };
}

export const env = getEnvironmentVariables();

export default env;
