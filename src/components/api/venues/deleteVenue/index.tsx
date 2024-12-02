import env from "../../Config";

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

  const endpoint = `/holidaze/venues/${encodeURIComponent(venueId)}`;
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token directly from localStorage
  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token Retrieved for Venue:", accessToken); // Debugging

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
      // Attempt to parse the error message from the response body
      let errorMessage = "Failed to delete venue.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error("Error response:", errorData);
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
      }
      throw new Error(errorMessage);
    }

    console.log("Venue deletion successful.");
  } catch (error: any) {
    console.error("Error during venue deletion process:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during venue deletion.");
    }
  }
}

export default deleteVenue;
