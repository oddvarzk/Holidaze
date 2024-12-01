// src/components/api/bookings/createBooking.ts

import env from "../../Config";
import { BookingRequest, BookingResponse } from "../types";

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
        "X-Noroff-API-Key": env.apiKey,
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
