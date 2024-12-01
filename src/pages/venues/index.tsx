import React, { useEffect, useState } from "react";
import {
  getAllVenues,
  searchVenues,
  Venue,
} from "../../components/api/venues/allVenues"; // Corrected import path
import example from "../../assets/example.png";
import locationIcon from "../../assets/locationIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import CheckinData from "../../components/BookingSearch"; // Corrected import path
import Loader from "../../components/Loader";

const VenueList: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Added for pagination
  const itemsPerPage = 25; // Number of items per page

  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters from URL
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";
  const dateFrom = params.get("dateFrom") || "";
  const dateTo = params.get("dateTo") || "";

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        if (query || dateFrom || dateTo) {
          // If there's a search query or date range, use the search function
          const searchResults = await searchVenues(query, dateFrom, dateTo);
          setVenues(searchResults);
        } else {
          // If no search parameters, fetch all venues
          const allVenues = await getAllVenues();
          setVenues(allVenues);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch venues.");
        console.error("Error fetching venues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [query, dateFrom, dateTo]);

  useEffect(() => {
    const filterVenues = () => {
      if (!dateFrom || !dateTo) {
        // If no dates are provided, filter by query only
        const trimmedQuery = query.trim().toLowerCase();
        if (trimmedQuery) {
          const filtered = venues.filter((venue) =>
            venue.name.toLowerCase().includes(trimmedQuery)
          );
          setFilteredVenues(filtered);
        } else {
          setFilteredVenues(venues);
        }
        return;
      }

      try {
        // Filter venues based on availability
        const desiredFrom = new Date(dateFrom);
        const desiredTo = new Date(dateTo);

        const availableVenues = venues.filter((venue) => {
          if (!venue.bookings || venue.bookings.length === 0) {
            // If no bookings, venue is available
            return true;
          }

          // Check if any booking overlaps with desired dates
          const hasOverlap = venue.bookings.some((booking) => {
            const bookingFrom = new Date(booking.dateFrom);
            const bookingTo = new Date(booking.dateTo);

            return desiredFrom <= bookingTo && desiredTo >= bookingFrom;
          });

          return !hasOverlap;
        });

        // Further filter by query if present
        const trimmedQuery = query.trim().toLowerCase();
        const finalFiltered = trimmedQuery
          ? availableVenues.filter((venue) =>
              venue.name.toLowerCase().includes(trimmedQuery)
            )
          : availableVenues;

        setFilteredVenues(finalFiltered);
      } catch (err: any) {
        setError("Failed to filter venues by availability.");
        console.error("Error filtering venues:", err);
      }
    };

    filterVenues();
  }, [venues, query, dateFrom, dateTo]);

  // Reset currentPage when filteredVenues change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredVenues]);

  const handleVenueClick = (id: string) => {
    navigate(`/venue/${id}`);
  };

  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);

  return (
    <div className="bg-paleSand min-h-screen">
      <div className="container mx-auto px-5 py-10">
        {/* Date Range Picker */}
        <CheckinData />

        <h1 className="font-Playfair font-normal text-center text-tiner text-3xl py-5">
          {query || dateFrom || dateTo
            ? `Search Results for "${query}"${
                dateFrom && dateTo
                  ? ` from ${new Date(
                      dateFrom
                    ).toLocaleDateString()} to ${new Date(
                      dateTo
                    ).toLocaleDateString()}`
                  : ""
              }`
            : "All Venues"}
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex flex-wrap justify-center py-5 gap-16">
              {filteredVenues.length > 0 ? (
                filteredVenues
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((venue) => (
                    <div
                      key={venue.id}
                      className="shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer h-90 flex flex-col w-64"
                      onClick={() => handleVenueClick(venue.id)}
                    >
                      {/* Venue card content */}
                      <div>
                        <img
                          src={
                            venue.media && venue.media.length > 0
                              ? venue.media[0].url
                              : example
                          }
                          alt={
                            venue.media && venue.media.length > 0
                              ? venue.media[0].alt
                              : "Venue Image"
                          }
                          className="h-44 w-full object-cover"
                        />
                      </div>
                      <div className="py-1 flex flex-col justify-between flex-1 px-3">
                        <h3 className="text-tiner text-lg font-medium font-Montserrat whitespace-nowrap overflow-hidden text-ellipsis">
                          {venue.name}
                        </h3>
                        <div className="flex items-center">
                          <img
                            src={locationIcon}
                            alt="Location Icon"
                            className="h-5 w-6"
                          />
                          <p className="text-tin font-normal text-sm font-Montserrat ml-1">
                            {venue.location.city}, {venue.location.country}
                          </p>
                        </div>
                        <div className="py-1">
                          <p className="text-base font-Montserrat">
                            ${venue.price} /night
                          </p>
                        </div>
                        <div>
                          <ul className="list-none font-Montserrat">
                            {venue.meta.breakfast && (
                              <li className="flex items-center text-gray-500 text-sm">
                                <span className="text-gray-400 mr-2">•</span>
                                Breakfast included
                              </li>
                            )}
                            {venue.meta.parking && (
                              <li className="flex items-center text-gray-500 text-sm">
                                <span className="text-gray-400 mr-2">•</span>
                                Free parking
                              </li>
                            )}
                            {venue.meta.wifi && (
                              <li className="flex items-center text-gray-500 text-sm">
                                <span className="text-gray-400 mr-2">•</span>
                                Free Wi-Fi
                              </li>
                            )}
                            {venue.meta.pets && (
                              <li className="flex items-center text-gray-500 text-sm">
                                <span className="text-gray-400 mr-2">•</span>
                                Pet-friendly
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No venues found matching your search.</p>
              )}
            </div>
            {/* Pagination Buttons */}
            {filteredVenues.length > itemsPerPage && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-2 bg-btns text-white hover:bg-amber-100 hover:text-charcoal rounded disabled:opacity-50"
                >
                  Previous Page
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-2 bg-btns text-white hover:bg-amber-100 hover:text-charcoal rounded disabled:opacity-50"
                >
                  Next Page
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VenueList;
