import env from "../../Config";
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

  const endpoint = `/holidaze/venues/${venueId}`;
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token directly from localStorage
  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token Retrieved for Venue:", accessToken); // Debugging

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
  } catch (error: any) {
    console.error("Error during venue update process:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during venue update.");
    }
  }
}

export default updateVenue;
