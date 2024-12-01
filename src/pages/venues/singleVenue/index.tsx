// src/pages/SingleVenue/SingleVenue.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVenueById, Venue } from "../../../components/api/venues/allVenues"; // Updated import path
import {
  createBooking,
  BookingRequest,
} from "../../../components/api/bookings/bookingsAPI";
import { DayPicker, DateRange as DayPickerDateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { parseISO, eachDayOfInterval } from "date-fns";
import exampleImage from "../../../assets/example.png";
import locationIcon from "../../../assets/locationIcon.svg";

// Define a separate type for booked date ranges
interface BookingRange {
  from: Date;
  to: Date;
}

const SingleVenue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [bookedDateRanges, setBookedDateRanges] = useState<BookingRange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<
    DayPickerDateRange | undefined
  >(undefined);
  const [availabilityChecked, setAvailabilityChecked] =
    useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [guests, setGuests] = useState<number>(1);
  const [bookingMessage, setBookingMessage] = useState<string>("");

  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = !!accessToken;

  // Fetch venue details with bookings
  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) {
        setError("No venue ID provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await getVenueById(id, true); // Include bookings
        setVenue(response.data);

        if (response.data.bookings) {
          const bookingRanges: BookingRange[] = response.data.bookings.map(
            (booking) => ({
              from: parseISO(booking.dateFrom),
              to: parseISO(booking.dateTo),
            })
          );
          setBookedDateRanges(bookingRanges);
        }
      } catch (err: any) {
        setError("Failed to fetch venue details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Function to check if a date is booked
  const isDateBooked = (date: Date): boolean => {
    return bookedDateRanges.some(
      (range) => date >= range.from && date <= range.to
    );
  };

  // Check availability for selected dates
  const checkAvailability = () => {
    const { from, to } = selectedRange || {};
    if (!from || !to) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    setError("");
    setAvailabilityChecked(false);
    const selectedDates = Array.from(
      eachDayOfInterval({ start: from, end: to })
    );
    const hasOverlap = selectedDates.some((date) => isDateBooked(date));

    setIsAvailable(!hasOverlap);
    setAvailabilityChecked(true);
  };

  // Handle booking submission
  const handleBooking = async () => {
    const { from, to } = selectedRange || {};
    if (!from || !to) {
      setBookingMessage("Please select both check-in and check-out dates.");
      return;
    }
    if (!isAvailable) {
      setBookingMessage("Selected dates are unavailable.");
      return;
    }

    if (!isAuthenticated) {
      setBookingMessage("Please log in to make a booking.");
      navigate("/login"); // Adjust the login route as necessary
      return;
    }

    try {
      const bookingDetails: BookingRequest = {
        dateFrom: from.toISOString(),
        dateTo: to.toISOString(),
        guests,
        venueId: venue!.id,
      };

      const response = await createBooking(bookingDetails);
      setBookingMessage(
        `Booking successful! Your booking ID is ${response.data.id}.`
      );
      setSelectedRange(undefined); // Clear selection after booking

      // Refresh booked dates to include the new booking
      // Re-fetch venue data to get updated bookings
      const updatedResponse = await getVenueById(id!, true);
      if (updatedResponse.data.bookings) {
        const updatedRanges: BookingRange[] = updatedResponse.data.bookings.map(
          (booking) => ({
            from: parseISO(booking.dateFrom),
            to: parseISO(booking.dateTo),
          })
        );
        setBookedDateRanges(updatedRanges);
      }
    } catch (err: any) {
      setBookingMessage(`Booking failed: ${err.message}`);
      console.error("Booking error:", err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Error state
  if (error && !venue) {
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
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-5 py-10">
        {/* Venue Title */}
        <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>

        {/* Venue Images */}
        <div className="flex flex-wrap gap-4 mt-4">
          {venue.media && venue.media.length > 0 ? (
            venue.media.map((mediaItem, index) => (
              <img
                key={index}
                src={mediaItem.url}
                alt={mediaItem.alt || "Venue Image"}
                loading="lazy" // Add lazy loading
                className="h-64 w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-md"
              />
            ))
          ) : (
            <img
              src={exampleImage}
              alt="Default Venue"
              loading="lazy" // Add lazy loading
              className="h-64 w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Venue Details */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="Location Icon" className="h-5 w-5" />
            <p className="text-gray-700">
              {venue.location.city}, {venue.location.country}
            </p>
          </div>
          <p className="mt-4 text-gray-600">{venue.description}</p>

          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {venue.price} NOK / night
              </p>
              <p className="text-sm text-gray-500">
                Max Guests: {venue.maxGuests}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-gray-700">{venue.rating} / 5</p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900">Book Your Stay</h2>
          <DayPicker
            mode="range"
            selected={selectedRange}
            onSelect={setSelectedRange}
            disabled={(date: Date) => date < new Date() || isDateBooked(date)}
            className="mt-4"
          />
          <div className="mt-4">
            <label htmlFor="guests" className="block text-gray-700">
              Number of Guests:
            </label>
            <input
              type="number"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              min="1"
              max={venue.maxGuests}
              placeholder="Enter number of guests"
              className="mt-1 px-4 py-2 border rounded-lg w-full"
            />
          </div>
          <button
            onClick={checkAvailability}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Check Availability
          </button>
          {availabilityChecked && (
            <p
              className={`mt-4 ${
                isAvailable ? "text-green-500" : "text-red-500"
              }`}
            >
              {isAvailable
                ? "The venue is available for the selected dates!"
                : "Selected dates are unavailable. Please try other dates."}
            </p>
          )}
          {isAvailable && (
            <button
              onClick={handleBooking}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Book Now
            </button>
          )}
          {bookingMessage && (
            <p
              className={`mt-4 ${
                bookingMessage.startsWith("Booking successful")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {bookingMessage}
            </p>
          )}
        </div>

        {/* Amenities */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">Amenities</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {venue.meta.wifi && <li>Free Wi-Fi</li>}
            {venue.meta.parking && <li>Free Parking</li>}
            {venue.meta.breakfast && <li>Breakfast Included</li>}
            {venue.meta.pets && <li>Pet-friendly</li>}
          </ul>
        </div>

        {/* Timestamps */}
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            <strong>Created:</strong>{" "}
            {new Date(venue.created).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong>{" "}
            {new Date(venue.updated).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleVenue;
