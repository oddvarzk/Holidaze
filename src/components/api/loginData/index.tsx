import env from "../Config";

interface Profile {
  email: string;
  password: string;
}

const action = "/auth/login";
const method: "POST" = "POST";

export async function LoginData(profile: Profile): Promise<string> {
  // Check if the API base URL is defined
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  // Construct the register URL
  const loginURL = new URL(action, env.apiBaseUrl).toString();
  console.log("Login:", loginURL);

  try {
    // Log the payload for debugging purposes
    console.log("Request payload:", profile);

    // Make the API request
    const response = await fetch(loginURL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    // Log response metadata
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // Check if the response is not OK
    if (!response.ok) {
      const errorData: { message: string } = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    // Log success and return the access token
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error object:", error);
      console.error("Login error:", error.message);
      throw new Error(`Login failed: ${error.message}`);
    } else {
      console.error("Unexpected login error:", error);
      throw new Error("An unknown error occurred during login.");
    }
  }

  // Fallback (this ensures all paths are accounted for, even unreachable ones)
  throw new Error("Unexpected end of function execution.");
}

export default LoginData;
