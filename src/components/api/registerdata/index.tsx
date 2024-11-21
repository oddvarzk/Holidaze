import env from "../Config";

interface Profile {
  username: string;
  email: string;
  password: string;
}

const action = "/auth/register";
const method: "POST" = "POST";

export async function RegisterData(profile: Profile): Promise<string> {
  const registerURL = env.apiBaseUrl + action;
  console.log("Register URL:", registerURL);

  try {
    const response = await fetch(registerURL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json(); // Parse JSON response from the server

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    // Assuming the access token is returned in the data object under the key 'accessToken'
    console.log("Registration successful, access token:", data.accessToken);
    return data.accessToken; // You might want to handle or store the access token here
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export default RegisterData;
