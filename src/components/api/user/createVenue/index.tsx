// src/components/api/createVenue.ts

import env from "../../Config"; // Adjust the path based on your project structure
import {
  CreateVenueFormValues,
  CreateVenueResponse,
} from "../../../../types/CreateVenueTypes";
import { load } from "../../../storage"; // Ensure the correct path

/**
 * Sends a POST request to create a new venue.
 * @param venueData - The data of the venue to be created.
 * @returns A promise resolving to the API response.
 * @throws Will throw an error if the request fails.
 */
export async function createVenue(
  venueData: CreateVenueFormValues
): Promise<CreateVenueResponse> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = "/holidaze/venues"; // Adjust based on your API's endpoint structure
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token from localStorage
  const accessToken = load("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token
        "X-Noroff-API-Key": env.apiKey, // Include the API key
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      // Attempt to parse the error message from the response body
      let errorMessage = "Failed to create venue.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("Error response:", errorData);
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    // Parse the response body to get the created venue info
    const responseData: CreateVenueResponse = await response.json();
    console.log("Venue creation successful:", responseData);

    return responseData;
  } catch (error) {
    console.error("Error during venue creation process:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during venue creation.");
    }
  }
}
export default createVenue;