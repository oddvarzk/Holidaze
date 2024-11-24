import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { load } from "../../components/storage";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // State for search form visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const accessToken = load("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your search logic here
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    // Optionally, close the search form
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
          setIsAuthenticated={setIsAuthenticated}
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
