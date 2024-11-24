// api/venues.tsx

import env from "../../Config";

// Base URL of your API
const BASE_URL = env.apiBaseUrl;

// Interfaces for TypeScript
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
}

export interface VenuesResponse {
  data: Venue[];
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

export interface SingleVenueResponse {
  data: Venue;
  meta: object;
}

// Function to retrieve all venues with pagination
export const getAllVenues = async (
  page: number = 1,
  limit: number = 20
): Promise<VenuesResponse> => {
  const response = await fetch(
    `${BASE_URL}/holidaze/venues?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching venues: ${response.statusText}`);
  }

  const data: VenuesResponse = await response.json();
  return data;
};

// Function to retrieve a single venue by ID
export const getVenueById = async (
  id: string
): Promise<SingleVenueResponse> => {
  const response = await fetch(`${BASE_URL}/holidaze/venues/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching venue ${id}: ${response.statusText}`);
  }

  const data: SingleVenueResponse = await response.json();
  return data;
};

// Function to retrieve venues by a specific profile
export const getVenuesByProfile = async (
  profileId: string
): Promise<VenuesResponse> => {
  const response = await fetch(`${BASE_URL}/profiles/${profileId}/venues`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching venues for profile ${profileId}: ${response.statusText}`
    );
  }

  const data: VenuesResponse = await response.json();
  return data;
};
