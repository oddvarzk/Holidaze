import env from "../../Config";
import { User } from "../../../../types/User";

interface EditProfileData {
  avatar?: {
    url: string;
    alt: string;
  };
  venueManager?: boolean;
}

export async function editProfile(
  profileName: string,
  data: EditProfileData
): Promise<{ data: User }> {
  if (!env.apiBaseUrl) {
    throw new Error("API base URL is not defined.");
  }

  const endpoint = `/holidaze/profiles/${profileName}`;
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": env.apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile.");
    }

    const responseData = await response.json();
    return { data: responseData.data };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw new Error(
      error.message || "An unknown error occurred while updating profile."
    );
  }
}
