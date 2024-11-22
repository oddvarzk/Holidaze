interface EnvVars {
  apiBaseUrl: string;
  apiKey: string;
}

function getEnvironmentVariables(): EnvVars {
  const { VITE_API_BASE_URL, VITE_API_KEY } = import.meta.env;

  if (!VITE_API_BASE_URL || !VITE_API_KEY) {
    throw new Error(
      "One or more environment variables are missing. Please check your .env file."
    );
  }

  return {
    apiBaseUrl: VITE_API_BASE_URL,
    apiKey: VITE_API_KEY,
  };
}

export const env: EnvVars = getEnvironmentVariables();

export default env;
