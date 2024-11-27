// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the shape of your AuthContext
interface AuthContextType {
  role: boolean; // true if venueManager, false otherwise
  isAuthenticated: boolean;
  setAuth: (authData: { role: boolean }) => void;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  role: false,
  isAuthenticated: false,
  setAuth: () => {},
});

// Define the props interface including children
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setAuth = (authData: { role: boolean }) => {
    setRole(authData.role);
    setIsAuthenticated(authData.role);

    if (authData.role) {
      localStorage.setItem("venueManager", "true");
    } else {
      localStorage.removeItem("venueManager");
    }
  };

  useEffect(() => {
    // On app load, parse the user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.venueManager) {
          setRole(true);
          setIsAuthenticated(true);
        } else {
          setRole(false);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to parse user data from local storage:", error);
        setRole(false);
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
