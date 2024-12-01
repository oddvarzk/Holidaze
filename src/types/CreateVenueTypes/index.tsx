export interface Media {
  url: string;
  alt: string;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent?: string;
}

export interface CreateVenueFormValues {
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating?: number;
  meta: Meta;
  location: Location;
}

export interface CreateVenueResponse {
  data: {
    id: string;
    name: string;
    description: string;
    media: Media[];
    price: number;
    maxGuests: number;
    rating?: number;
    meta: Meta;
    location: Location;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}
