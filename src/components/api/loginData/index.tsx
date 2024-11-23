import env from "../Config";

interface Credentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  // Include other user fields as necessary
}

interface LoginResponse {
  data: {
    name: string;
    email: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
    accessToken: string;
    // Include other user fields as necessary
  };
  meta: any;
}

const action = "/auth/login";
const method: "POST" = "POST";

export async function LoginData(
  credentials: Credentials
): Promise<{ accessToken: string; user: User }> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const loginURL = new URL(action, env.apiBaseUrl).toString();
  console.log("Login URL:", loginURL);

  try {
    console.log("Request payload:", credentials);

    const response = await fetch(loginURL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      // Attempt to parse the error message from the response body
      let errorMessage = "Failed to login.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("Error response:", errorData);
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    // Parse the response body to get the access token and user info
    const responseData: LoginResponse = await response.json();
    console.log("Login successful", responseData);

    // Extract the accessToken and user data from responseData.data
    const { accessToken, ...user } = responseData.data;

    // Return the accessToken and user
    return { accessToken, user };
  } catch (error) {
    console.error("Error during login process:", error);
    // Re-throw the error to be caught in handleSubmit
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during login.");
    }
  }
}

export default LoginData;
