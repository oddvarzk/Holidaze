// src/components/api/loginData.tsx

import env from "../Config";

interface Credentials {
  email: string;
  password: string;
}

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface User {
  name: string;
  email: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean; // Included venueManager property
  // Include other user fields as necessary
}

interface LoginResponse {
  data: {
    name: string;
    email: string;
    avatar: Avatar;
    banner: Banner;
    accessToken: string;
    venueManager: boolean; // Ensure venueManager is included in the response
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

  // Include the _holidaze=true query parameter
  const loginURL = new URL(action, env.apiBaseUrl);
  loginURL.searchParams.append("_holidaze", "true"); // Adds ?_holidaze=true to the URL

  console.log("Login URL with query params:", loginURL.toString());

  try {
    console.log("Request payload:", credentials);

    const response = await fetch(loginURL.toString(), {
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
    const { accessToken, venueManager, ...userData } = responseData.data;

    // Ensure venueManager is included in the user object
    const user: User = {
      ...userData,
      venueManager, // Include the venueManager property
    };

    console.log("User object to be saved:", user);

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
