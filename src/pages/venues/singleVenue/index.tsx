// src/pages/SingleVenue.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById, Venue } from "../../../components/api/venues/allVenues"; // Adjust the import path
import example from "../../../assets/example.png";
import locationIcon from "../../../assets/locationIcon.svg";

const SingleVenue: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the ID from URL
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) {
        setError("No venue ID provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await getVenueById(id);
        setVenue(response.data);
      } catch (err) {
        setError("Failed to fetch venue details.");
        console.error("Error fetching venue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Venue not found.
      </div>
    );
  }

  return (
    <div className="bg-paleSand min-h-screen">
      <div className="container mx-auto px-5 py-10">
        {/* Venue Image Gallery */}
        <div className="flex flex-wrap justify-center gap-4">
          {venue.media && venue.media.length > 0 ? (
            venue.media.map((mediaItem, index) => (
              <img
                key={index}
                src={mediaItem.url}
                alt={mediaItem.alt}
                className="h-64 w-96 object-cover rounded-md shadow-md"
              />
            ))
          ) : (
            <img
              src={example}
              alt="Venue Image"
              className="h-64 w-96 object-cover rounded-md shadow-md"
            />
          )}
        </div>

        {/* Venue Details */}
        <div className="mt-10">
          <h1 className="text-4xl font-bold text-tiner">{venue.name}</h1>
          <div className="flex items-center mt-2">
            <img
              src={locationIcon}
              alt="Location Icon"
              className="h-6 w-6 mr-2"
            />
            <p className="text-lg font-Montserrat text-gray-700">
              {venue.location.city}, {venue.location.country}
            </p>
          </div>
          <p className="mt-4 text-md font-Montserrat text-gray-600">
            {venue.description}
          </p>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-2xl font-semibold text-tiner">
                ${venue.price} /night
              </p>
              <p className="text-sm text-gray-500">
                Maximum Guests: {venue.maxGuests}
              </p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.978a1 1 0 00.95.69h4.179c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.978c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.978a1 1 0 00-.364-1.118L2.98 9.405c-.783-.57-.38-1.81.588-1.81h4.179a1 1 0 00.95-.69l1.286-3.978z" />
              </svg>
              <span className="ml-1 text-lg font-Montserrat text-gray-700">
                {venue.rating}
              </span>
            </div>
          </div>

          {/* Meta Features */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-tiner">Amenities</h2>
            <ul className="list-disc list-inside mt-2 text-gray-600 font-Montserrat">
              {venue.meta.wifi && <li>Free Wi-Fi</li>}
              {venue.meta.parking && <li>Free Parking</li>}
              {venue.meta.breakfast && <li>Breakfast Included</li>}
              {venue.meta.pets && <li>Pet-friendly</li>}
              {/* Add more amenities as needed */}
            </ul>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-tiner">
              Additional Information
            </h2>
            <div className="mt-2">
              <p className="text-gray-600 font-Montserrat">
                <strong>Created:</strong>{" "}
                {new Date(venue.created).toLocaleDateString()}
              </p>
              <p className="text-gray-600 font-Montserrat">
                <strong>Last Updated:</strong>{" "}
                {new Date(venue.updated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVenue;
