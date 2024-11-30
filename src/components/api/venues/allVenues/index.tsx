import env from "../../Config";

// Interface Definitions
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

// Fetch all venues with pagination
export const getAllVenues = async (): Promise<Venue[]> => {
  let allVenues: Venue[] = [];
  let page = 1;
  let totalPages = 1;
  const limit = 50; // Adjust as needed

  do {
    const url = `${env.apiBaseUrl}/holidaze/venues?page=${page}&limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": env.apiKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch venues.");
    }

    const data: VenuesResponse = await response.json();
    allVenues = allVenues.concat(data.data);

    totalPages = data.meta.pageCount;
    page += 1;
  } while (page <= totalPages);

  return allVenues;
};

// Fetch a single venue by ID with optional bookings
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
