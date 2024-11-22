import env from "../Config";

interface Profile {
  name: string;
  email: string;
  password: string;
}

const action = "/auth/register";
const method: "POST" = "POST";

export async function RegisterData(profile: Profile): Promise<string> {
  // Check if the API base URL is defined
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  // Construct the register URL
  const registerURL = new URL(action, env.apiBaseUrl).toString();
  console.log("Register URL:", registerURL);

  try {
    // Log the payload for debugging purposes
    console.log("Request payload:", profile);

    // Make the API request
    const response = await fetch(registerURL, {
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
      throw new Error(errorData.message || "Failed to register");
    }

    // Log success and return the access token
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error object:", error);
      console.error("Registration error:", error.message);
      throw new Error(`Registration failed: ${error.message}`);
    } else {
      console.error("Unexpected registration error:", error);
      throw new Error("An unknown error occurred during registration.");
    }
  }

  // Fallback (this ensures all paths are accounted for, even unreachable ones)
  throw new Error("Unexpected end of function execution.");
}

export default RegisterData;
