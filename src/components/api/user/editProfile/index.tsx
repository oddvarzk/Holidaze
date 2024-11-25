// api/editProfile.tsx

import env from "../../Config";
import { load } from "../../../storage";

const BASE_URL = env.apiBaseUrl;
const API_KEY = env.apiKey; // Retrieve API key from config

interface EditProfileRequest {
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  venueManager?: boolean;
}

interface EditProfileResponse {
  data: {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
    venueManager?: boolean;
  };
  meta: {};
}

export const editProfile = async (
  name: string,
  profileData: EditProfileRequest
): Promise<EditProfileResponse> => {
  const accessToken = load("accessToken");
  console.log("Access Token:", accessToken); // Debugging line

  if (!accessToken) {
    throw new Error("User is not authenticated. Please log in.");
  }

  const response = await fetch(`${BASE_URL}/holidaze/profiles/${name}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // Adjust the error message extraction based on your API's error structure
    throw new Error(
      errorData.errors?.[0]?.message || "Failed to update profile"
    );
  }

  const data: EditProfileResponse = await response.json();
  return data;
};
