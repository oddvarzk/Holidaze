// src/types/AuthContextType.ts

import { User } from "../User";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (accessToken: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}
