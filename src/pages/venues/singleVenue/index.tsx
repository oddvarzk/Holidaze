import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById, Venue } from "../../../components/api/venues/allVenues";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { eachDayOfInterval, parseISO, isSameDay } from "date-fns";
import exampleImage from "../../../assets/example.png";
import locationIcon from "../../../assets/locationIcon.svg";

const SingleVenue: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [availabilityChecked, setAvailabilityChecked] =
    useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

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
        const response = await getVenueById(id, true); // Include bookings in the response
        setVenue(response.data);

        // Process booked dates
        const dates: Date[] = [];
        if (response.data.bookings) {
          response.data.bookings.forEach((booking) => {
            const start = parseISO(booking.dateFrom);
            const end = parseISO(booking.dateTo);
            const range = eachDayOfInterval({ start, end });
            dates.push(...range);
          });
        }
        setBookedDates(dates);
      } catch (err: any) {
        setError("Failed to fetch venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  // Check availability for selected dates
  const checkAvailability = () => {
    const { from, to } = selectedRange || {};
    if (!from || !to) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    setError("");
    setAvailabilityChecked(false);
    const selectedDates = eachDayOfInterval({ start: from, end: to });
    const hasOverlap = selectedDates.some((date) =>
      bookedDates.some((bookedDate) => isSameDay(date, bookedDate))
    );

    setIsAvailable(!hasOverlap);
    setAvailabilityChecked(true);
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

  // Render venue details
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
                className="h-64 w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg shadow-md"
              />
            ))
          ) : (
            <img
              src={exampleImage}
              alt="Default Venue"
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
            disabled={[
              ...bookedDates, // Disable booked dates
              { before: new Date() }, // Disable past dates
            ]}
            className="mt-4"
          />
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
