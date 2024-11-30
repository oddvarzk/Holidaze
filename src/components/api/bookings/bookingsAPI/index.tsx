// src/components/api/bookings/bookingsAPI.tsx

import env from "../../Config"; // Adjust the path as necessary

// Existing Interfaces
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

export interface BookingRequest {
  dateFrom: string; // ISO string
  dateTo: string; // ISO string
  guests: number;
  venueId: string;
}

export interface BookingResponse {
  data: Booking;
  meta: object;
}

// New Interfaces for Bookings by Profile
export interface UserBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export interface BookingsByProfileResponse {
  data: UserBooking[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

// Existing Function: Fetch Bookings by Venue and Dates
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

// Existing Function: Create a Booking
export async function createBooking(
  bookingDetails: BookingRequest
): Promise<BookingResponse> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/bookings`;
  const url = new URL(endpoint, env.apiBaseUrl);

  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in.");
  }

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": env.apiKey, // Include the API key
      },
      body: JSON.stringify(bookingDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking.");
    }

    const data: BookingResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error creating booking:", error);
    throw new Error(
      error.message || "An unknown error occurred while creating the booking."
    );
  }
}

// **New Function: Fetch Bookings by Profile**
export async function fetchBookingsByProfile(
  profileName: string,
  page?: number,
  limit?: number
): Promise<UserBooking[]> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/profiles/${encodeURIComponent(
    profileName
  )}/bookings`;
  const url = new URL(endpoint, env.apiBaseUrl);

  // Append optional query parameters
  if (page) url.searchParams.append("page", page.toString());
  if (limit) url.searchParams.append("limit", limit.toString());

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
      throw new Error(
        errorData.message || "Failed to fetch bookings by profile."
      );
    }

    const responseData: BookingsByProfileResponse = await response.json();
    return responseData.data;
  } catch (error: any) {
    console.error("Error fetching bookings by profile:", error);
    throw new Error(
      error.message ||
        "An unknown error occurred while fetching bookings by profile."
    );
  }
}

export default fetchBookingsByDates;
