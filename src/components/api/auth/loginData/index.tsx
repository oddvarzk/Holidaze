import env from "../../Config";

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
  venueManager: boolean;
}

interface LoginResponse {
  data: {
    name: string;
    email: string;
    avatar: Avatar;
    banner: Banner;
    accessToken: string;
    venueManager: boolean;
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

  const loginURL = new URL(action, env.apiBaseUrl);
  loginURL.searchParams.append("_holidaze", "true");

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

    const responseData: LoginResponse = await response.json();
    console.log("Login successful", responseData);

    // Extract the accessToken and user data from responseData.data
    const { accessToken, venueManager, ...userData } = responseData.data;

    const user: User = {
      ...userData,
      venueManager,
    };

    console.log("User object to be saved:", user);

    // Return the accessToken and user
    return { accessToken, user };
  } catch (error) {
    console.error("Error during login process:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during login.");
    }
  }
}

export default LoginData;
