// src/types/CreateVenueTypes.ts

/**
 * Represents the structure of a media item associated with a venue.
 */
export interface Media {
  url: string;
  alt: string;
}

/**
 * Represents the amenities (meta) available at the venue.
 */
export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

/**
 * Represents the location details of the venue.
 */
export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent?: string; // Optional if not used in the form
}

/**
 * Represents the values collected from the Create Venue form.
 */
export interface CreateVenueFormValues {
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating?: number; // Optional field
  meta: Meta;
  location: Location;
}

/**
 * Represents the structure of the API response when creating a venue.
 */
export interface CreateVenueResponse {
  data: {
    id: string; // Assuming the venue has an ID
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating?: number;
    meta: Meta;
    location: Location;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    // Add any other fields returned by the API as needed
  };
  message: string; // Success message
}
