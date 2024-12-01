import { useEffect, useState } from "react";
import greeceBackg from "../../assets/greeceBackg.jpg";
import CheckinData from "../../components/Utility/BookingSearch";
import planeIcon from "../../assets/plane.svg";
import palmTreeIcon from "../../assets/palmTree.svg";
import mapIcon from "../../assets/mapIcon.svg";
import example from "../../assets/example.png";
import locationIcon from "../../assets/locationIcon.svg";
import { getAllVenues, Venue } from "../../components/api/venues/allVenues";
import { Link } from "react-router-dom";
import Loader from "../../components/Utility/Loader";

export function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venuesData = await getAllVenues();
        setVenues(venuesData);
      } catch (err) {
        setError("Failed to fetch venues.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="bg-paleSand">
      {/* Main bg and Search data */}
      <div
        className="relative bg-no-repeat bg-cover md:h-[60vh] h-[40vh] w-full flex items-center justify-center bg-top sm:bg-center"
        style={{ backgroundImage: `url(${greeceBackg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 text-opacity-0"></div>
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-Montserrat font-light text-white">
            Escape. Seamless. Unforgettable
          </h1>
        </div>
        <div className="absolute bottom-5 gap-5 mb-5">
          <CheckinData />
        </div>
      </div>
      {/* 2nd Main Info */}
      <div className="text-center py-5 px-2 mt-5">
        <h1 className="font-Playfair font-normal text-tiner text-3xl py-2">
          Find your sanctuary
        </h1>
        <p className="font-Montserrat text-gray-500 font-light text-md mt-2 mx-auto max-w-4xl lg:max-w-4xl">
          Explore a curated collection of exquisite stays from around the globe.
          Whether you're seeking a tranquil beachfront bungalow, a cozy mountain
          retreat, or a vibrant cityscape condo, Holidaze connects you to the
          perfect destination.
        </p>
      </div>
      {/* Front page travel icons */}
      <div className="flex md:justify-between lg:px-60 justify-center gap-16 py-7 px-2 mt-5">
        <div className="px-2">
          <img src={planeIcon} alt="Plane Icon" className="h-28 w-28" />
        </div>
        <div className="px-2">
          <img src={palmTreeIcon} alt="Palm Tree Icon" className="h-28 w-28" />
        </div>
        <div className="px-2">
          <img src={mapIcon} alt="Map Icon" className="h-28 w-28" />
        </div>
      </div>
      <div className="border border-b-2 mt-6"></div>
      <div className="px-5 py-5 mt-4">
        <h1 className="font-Playfair font-normal text-center text-tiner text-3xl py-5">
          Recommended stays
        </h1>
        {/* Recommended Venue Boxes */}
        {loading ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-wrap justify-center py-5 gap-10 mb-10">
            {venues.slice(0, 6).map((venue) => (
              <Link
                key={venue.id}
                to={`/venue/${venue.id}`}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
