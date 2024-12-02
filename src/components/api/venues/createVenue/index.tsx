import env from "../../Config";
import {
  CreateVenueFormValues,
  CreateVenueResponse,
} from "../../../../types/CreateVenueTypes";

export async function createVenue(
  venueData: CreateVenueFormValues
): Promise<CreateVenueResponse> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/venues`;
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token directly from localStorage
  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token Retrieved for Venue:", accessToken); // Debugging

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
  } catch (error: any) {
    console.error("Error during venue creation process:", error);
    throw new Error(
      error.message || "An unknown error occurred during venue creation."
    );
  }
}

export default createVenue;
