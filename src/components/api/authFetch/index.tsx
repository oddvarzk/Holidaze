import { load } from "../../storage/index.tsx";

export function headers(): HeadersInit {
  const token = load("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": process.env.REACT_APP_API_KEY || "", // Fallback to empty string if not found
  };
}

interface AuthFetchOptions extends RequestInit {
  method?: string;
  body?: BodyInit | null;
}

export async function authFetch(
  url: string,
  options: AuthFetchOptions = {}
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers(),
      ...options.headers,
    },
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response;
}
