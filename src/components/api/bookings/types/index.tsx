// src/components/api/bookings/types.ts

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

// Interfaces for Bookings by Profile
export interface UserBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: {
    id: string;
    name: string;
  };
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
