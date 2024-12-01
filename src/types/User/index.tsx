export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}

export interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: Avatar;
  banner?: Banner;
  venueManager: boolean;
}
