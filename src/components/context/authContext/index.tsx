// src/components/context/authContext/index.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/User";
import { AuthContextType } from "../../../types/authContextType/index.tsx";

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Initialize authentication state from storage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);

        // Validate the parsed user data
        if (
          typeof parsedUser.name === "string" &&
          typeof parsedUser.email === "string" &&
          typeof parsedUser.venueManager === "boolean"
        ) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        } else {
          // If validation fails, clear invalid data
          console.error("Invalid user data in localStorage.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }

    setLoading(false); // Set loading to false after initialization
  }, []);

  // Login function
  const login = (accessToken: string, userData: User) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
