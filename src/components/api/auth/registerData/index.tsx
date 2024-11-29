// src/components/api/registerData/index.tsx

import env from "../../Config";

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface Profile {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: Avatar;
  banner?: Banner;
  venueManager: boolean; // Now required
}

const action = "/auth/register";
const method: "POST" = "POST";

export async function RegisterData(
  profile: Omit<Profile, "venueManager">
): Promise<void> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const registerURL = new URL(action, env.apiBaseUrl).toString();
  console.log("Register URL:", registerURL);

  try {
    // Explicitly set venueManager to false
    const profileData: Profile = {
      ...profile,
      venueManager: false,
    };

    console.log("Request payload:", profileData);

    const response = await fetch(registerURL, {
      method,
      headers: { "Content-Type": "application/json" }, // Keep existing headers
      body: JSON.stringify(profileData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      // Attempt to parse the error message from the response body
      let errorMessage = "Failed to register.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("Error response:", errorData);
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    // Optionally handle successful registration (e.g., redirect or inform the user)
    console.log("Registration successful");
  } catch (error) {
    console.error("Error during registration process:", error);
    // Re-throw the error to be caught in handleSubmit
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during registration.");
    }
  }
}

export default RegisterData;
