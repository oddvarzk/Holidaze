// src/components/Header.tsx

import React, { useState } from "react";
import Nav from "../Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/index.tsx";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to /venues with the search query
    navigate(`/venues?query=${encodeURIComponent(searchQuery)}`);
    setShowSearch(false);
  };

  return (
    <>
      <header className="flex justify-between py-2 px-7 bg-tin text-white">
        <div className="mt-2">
          <Link to="/">
            <h3 className="font-Metamorphous text-xl text-amber-100 py-6">
              Holidaze
            </h3>
          </Link>
        </div>
        <Nav
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={logout} // Pass the logout function as setIsAuthenticated
          setShowSearch={setShowSearch}
        />
      </header>

      {/* Search Form */}
      {showSearch && (
        <div className="w-full bg-tin py-4 px-4">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-3xl mx-auto flex"
          >
            <input
              type="text"
              placeholder="Search for venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l"
            />
            <button
              type="submit"
              className="bg-btns text-white px-4 py-2 rounded-r hover:bg-amber-100 hover:text-charcoal"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Header;
