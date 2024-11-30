// src/components/api/bookings/bookingsAPI.tsx

import env from "../../Config"; // Adjust the path as necessary

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
    description: string;
    media: {
      url: string;
      alt: string;
    }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
    location: {
      address: string;
      city: string;
      zip: string;
      country: string;
      continent: string;
      lat: number;
      lng: number;
    };
  };
}

export async function fetchBookingsByDates(
  venueId: string,
  dateFrom: string,
  dateTo: string
): Promise<Booking[]> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/bookings`;
  const url = new URL(endpoint, env.apiBaseUrl);

  // Append query parameters
  url.searchParams.append("_venue", "true");
  url.searchParams.append("venueId", venueId);
  url.searchParams.append("dateFrom", dateFrom);
  url.searchParams.append("dateTo", dateTo);

  // Retrieve the access token directly from localStorage
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": env.apiKey, // Include the API key
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch bookings.");
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    throw new Error(
      error.message || "An unknown error occurred while fetching bookings."
    );
  }
}

export default fetchBookingsByDates;
