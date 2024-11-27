// src/components/api/updateVenue.tsx

import env from "../../Config"; // Adjust the path based on your project structure
import { load } from "../../../storage"; // Ensure the correct path
import {
  CreateVenueFormValues,
  CreateVenueResponse,
} from "../../../../types/CreateVenueTypes";

/**
 * Sends a PUT request to update an existing venue.
 * @param venueId - The ID of the venue to be updated.
 * @param venueData - The updated data of the venue.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the request fails.
 */
export async function updateVenue(
  venueId: string,
  venueData: CreateVenueFormValues
): Promise<CreateVenueResponse> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/venues/${venueId}`; // Adjust based on your API's endpoint structure
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token from localStorage
  const accessToken = load("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token
        "X-Noroff-API-Key": env.apiKey, // Include the API key
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      let errorMessage = "Failed to update venue.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("Error response:", errorData);
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    const responseData: CreateVenueResponse = await response.json();
    console.log("Venue update successful:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error during venue update process:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during venue update.");
    }
  }
}

export default updateVenue;
