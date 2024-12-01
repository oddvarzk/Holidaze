// src/components/api/bookings/fetchBookingsByProfile.ts

import env from "../../Config";
import { UserBooking, BookingsByProfileResponse } from "../types";

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
        "X-Noroff-API-Key": env.apiKey,
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
