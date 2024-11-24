// components/VenueList.tsx

import React, { useEffect, useState } from "react";
import { getAllVenues, Venue } from "../../components/api/fetch/venues";
import example from "../../assets/example.png";
import locationIcon from "../../assets/locationIcon.svg";

export const VenueList: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await getAllVenues(currentPage, itemsPerPage);
        setVenues(response.data);
        setTotalPages(response.meta.pageCount);
      } catch (err) {
        setError("Failed to fetch venues.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [currentPage]);

  return (
    <div className="bg-paleSand">
      <div className="px-5 py-5 mt-4">
        <h1 className="font-Playfair font-normal text-center text-tiner text-3xl py-5">
          All Venues
        </h1>
        {loading ? (
          <p>Loading venues...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-wrap justify-center py-5 gap-10">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
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
                    className="h-44 w-64 object-cover"
                  />
                </div>
                <div className="py-1">
                  <h3 className="px-3 text-tiner text-lg font-medium font-Montserrat">
                    {venue.name}
                  </h3>
                  <div className="flex px-2">
                    <img
                      src={locationIcon}
                      alt="Location Icon"
                      className="h-5 w-6"
                    />
                    <p className="text-tin font-normal text-sm font-Montserrat">
                      {venue.location.city}, {venue.location.country}
                    </p>
                  </div>
                  <div className="px-4 py-1">
                    <p className="text-base font-Montserrat">
                      ${venue.price} /night
                    </p>
                  </div>
                  <div>
                    <ul className="list-none px-4 font-Montserrat">
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
            ))}
          </div>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-btns text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-btns text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueList;
