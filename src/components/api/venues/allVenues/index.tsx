// src/components/api/venues/allVenues.tsx

import env from "../../Config";

// Existing Interface
export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Array<{
    url: string;
    alt: string;
  }>;
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
  bookings?: Array<{
    id: string;
    dateFrom: string;
    dateTo: string;
  }>;
}

export interface SingleVenueResponse {
  data: Venue;
  meta: object;
}

// Modified `getVenueById` function to include bookings
export const getVenueById = async (
  id: string,
  includeBookings: boolean = false
): Promise<SingleVenueResponse> => {
  const endpoint = `/holidaze/venues/${id}`;
  const url = new URL(endpoint, env.apiBaseUrl);

  if (includeBookings) {
    url.searchParams.append("_bookings", "true");
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": env.apiKey,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch venue.");
  }

  const data: SingleVenueResponse = await response.json();
  return data;
};
