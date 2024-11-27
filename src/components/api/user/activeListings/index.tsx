// src/components/api/activeListings.tsx

import env from "../../Config"; // Adjust the path to your environment configuration
import { load } from "../../../storage"; // Adjust the path to your storage utility

export interface Venue {
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
}

export async function getActiveListings(profileName: string): Promise<Venue[]> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "API base URL is not defined. Check your environment variables."
    );
  }

  const endpoint = `/holidaze/profiles/${profileName}/venues`;
  const url = new URL(endpoint, env.apiBaseUrl).toString();

  // Retrieve the access token from localStorage
  const accessToken = load("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": env.apiKey, // Include the API key
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch active listings.");
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error: any) {
    console.error("Error fetching active listings:", error);
    throw new Error(
      error.message ||
        "An unknown error occurred while fetching active listings."
    );
  }
}

export default getActiveListings;
