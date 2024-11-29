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

// Function to retrieve all venues by fetching all pages
export const getAllVenues = async (): Promise<Venue[]> => {
  let allVenues: Venue[] = [];
  let page = 1;
  let totalPages = 1;
  const limit = 50; // Adjust the limit based on your API's max limit

  do {
    const url = `${BASE_URL}/holidaze/venues?page=${page}&limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching venues: ${response.statusText}`);
    }

    const data: VenuesResponse = await response.json();

    allVenues = allVenues.concat(data.data);

    totalPages = data.meta.pageCount;
    page += 1;
  } while (page <= totalPages);

  return allVenues;
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
