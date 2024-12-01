// src/components/api/user/activeVenuesWithBookings.tsx

import env from "../../Config";

// Interface Definitions
export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
  };
}

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
  bookings?: Booking[]; // Include bookings
}

// Fetch active venues with bookings for a specific owner
const getActiveListingsWithBookings = async (
  ownerName: string
): Promise<Venue[]> => {
  let allVenues: Venue[] = [];
  let page = 1;
  let totalPages = 1;
  const limit = 50; // Adjust as needed

  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }

  try {
    do {
      const url = `${env.apiBaseUrl}/holidaze/venues?page=${page}&limit=${limit}&owner=${ownerName}&_bookings=true`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": env.apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Data:", errorData); // Log error data
        throw new Error(errorData.message || "Failed to fetch venues.");
      }

      const data = await response.json();
      allVenues = allVenues.concat(data.data);

      totalPages = data.meta.pageCount;
      page += 1;
    } while (page <= totalPages);

    return allVenues;
  } catch (error: any) {
    console.error("Error in getActiveListingsWithBookings:", error);
    throw error;
  }
};

export default getActiveListingsWithBookings;
