// src/components/api/registerData/index.tsx

import env from "../Config";

interface Profile {
  name: string;
  email: string;
  password: string;
}

const action = "/auth/register";
const method: "POST" = "POST";

export async function RegisterData(profile: Profile): Promise<void> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const registerURL = new URL(action, env.apiBaseUrl).toString();
  console.log("Register URL:", registerURL);

  try {
    console.log("Request payload:", profile);

    const response = await fetch(registerURL, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
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

    // Do not attempt to parse the response body if it's empty
    // If you expect data in the response body, you can handle it here
    // const data = await response.json(); // Only if response has content

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
