import env from "../../Config";
import { load } from "../../../storage";

/**
 * Sends a DELETE request to delete a venue by its ID.
 * @param venueId - The ID of the venue to be deleted.
 * @returns A promise that resolves if the request was successful.
 * @throws Will throw an error if the request fails.
 */

export async function deleteVenue(venueId: string): Promise<void> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/venues/${venueId}`;
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token from localStorage
  const accessToken = load("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": env.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete venue.");
    }

    console.log("Venue deletion successful.");
  } catch (error) {
    console.error("Error during venue deletion process:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during venue deletion.");
    }
  }
}

export default deleteVenue;
