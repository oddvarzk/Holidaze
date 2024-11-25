// src/components/api/user/editProfile.ts

import env from "../../Config";
import { load } from "../../../../components/storage"; // Import the load function to retrieve the access token

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface UpdateProfileData {
  avatar?: Avatar;
  banner?: Banner;
  venueManager?: boolean;
  bio?: string;
  // Add other fields as necessary
}

interface EditProfileResponse {
  data: {
    name: string;
    email: string;
    bio?: string;
    avatar?: Avatar;
    banner?: Banner;
    venueManager: boolean;
    // Include other user fields as necessary
  };
  meta: any;
}

const action = "/holidaze/profiles"; // Updated endpoint as per API documentation
const method: "PUT" = "PUT"; // Updated method

export async function editProfile(
  name: string, // Using 'name' as per backend endpoint
  updateData: UpdateProfileData
): Promise<EditProfileResponse> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  // Construct the correct URL with proper encoding
  const editProfileURL = new URL(
    `${action}/${encodeURIComponent(name)}`,
    env.apiBaseUrl
  ).toString();
  console.log("Edit Profile URL:", editProfileURL);

  // Retrieve the access token from localStorage
  const accessToken = load("accessToken"); // Ensure that 'accessToken' is stored in localStorage
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    console.log("Request payload:", updateData);

    const response = await fetch(editProfileURL, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        "X-Noroff-API-Key": env.apiKey,
      },
      body: JSON.stringify(updateData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      // Attempt to parse the error message from the response body
      let errorMessage = "Failed to update profile.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("Error response:", errorData);
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    // Parse the response body to get the updated user info
    const responseData: EditProfileResponse = await response.json();
    console.log("Profile update successful", responseData);

    return responseData;
  } catch (error) {
    console.error("Error during profile update process:", error);
    // Re-throw the error to be caught in the component
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during profile update.");
    }
  }
}

export default editProfile;
