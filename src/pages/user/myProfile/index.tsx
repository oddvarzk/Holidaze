// src/pages/user/MyProfile.tsx

import React, { useEffect, useState } from "react";
import { editProfile } from "../../../components/api/user/editProfile"; // Ensure this is correctly imported
import createIcon from "../../../assets/createIcon.svg";
import { Link } from "react-router-dom";
import getActiveListings, {
  Venue,
} from "../../../components/api/user/activeVenues"; // Ensure this is correctly imported
import deleteVenue from "../../../components/api/venues/deleteVenue";
import { useAuth } from "../../../components/context/authContext"; // Ensure this is correctly imported

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: Avatar;
  banner?: Banner;
  venueManager: boolean;
}

export function MyProfile() {
  const { user: authUser, login } = useAuth(); // Access user and login from context
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [activeListings, setActiveListings] = useState<Venue[]>([]);
  const [listingsError, setListingsError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string>("");
  const [isBecomingVenueManager, setIsBecomingVenueManager] =
    useState<boolean>(false);

  useEffect(() => {
    if (authUser) {
      // Fetch active listings for the profile
      getActiveListings(authUser.name)
        .then((listings) => {
          setActiveListings(listings);
        })
        .catch((error) => {
          setListingsError(error.message || "Failed to fetch listings.");
        });
    }
  }, [authUser]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAvatarUrl(e.target.value);
  };

  const handleAvatarUpdate = async () => {
    if (!authUser) return;

    // Basic URL validation
    try {
      new URL(newAvatarUrl);
    } catch (_) {
      setUpdateError("Please enter a valid URL.");
      return;
    }

    setIsUpdating(true);
    setUpdateError("");
    setUpdateSuccess("");

    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const response = await editProfile(authUser.name, {
        avatar: {
          url: newAvatarUrl,
          alt: `${authUser.name}'s avatar`,
        },
      });

      // Update user data via AuthContext
      const updatedUser: User = {
        ...authUser,
        avatar: response.data.avatar,
      };
      login(accessToken, updatedUser); // Update context with new user data

      setUpdateSuccess("Avatar updated successfully!");
      setNewAvatarUrl("");
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update avatar.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBecomeVenueManager = async () => {
    if (!authUser) return;

    // Confirm action with the user
    const confirmAction = window.confirm(
      "Are you sure you want to become a Venue Manager? This will grant you access to manage your own venues."
    );
    if (!confirmAction) return;

    setIsBecomingVenueManager(true);
    setUpdateError("");
    setUpdateSuccess("");

    try {
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const response = await editProfile(authUser.name, {
        venueManager: true,
      });

      // Update user data via AuthContext
      const updatedUser: User = {
        ...authUser,
        venueManager: response.data.venueManager,
      };
      login(accessToken, updatedUser); // Update context with new user data

      setUpdateSuccess("You are now a Venue Manager!");
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update role.");
    } finally {
      setIsBecomingVenueManager(false);
    }
  };

  const handleDeleteVenue = async (venueId: string) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await deleteVenue(venueId);
        setActiveListings((prevListings) =>
          prevListings.filter((listing) => listing.id !== venueId)
        );
        console.log("Venue deleted successfully");
      } catch (error: any) {
        console.error("Failed to delete venue:", error);
        setListingsError(error.message || "Failed to delete venue.");
      }
    }
  };

  if (!authUser) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container max-w-full mx-auto py-5">
      <div>
        <div>
          <div className="flex flex-col justify-center text-center">
            <div className="flex justify-center">
              <img
                className="rounded-full h-32 w-32 object-cover"
                src={authUser.avatar?.url || "/default-avatar.png"}
                alt={authUser.avatar?.alt || "Profile Avatar"}
              />
            </div>
            <div className="mb-5">
              {/* Avatar Update Form */}
              <div className="flex flex-col items-center mt-4">
                <input
                  type="text"
                  placeholder="Enter new avatar URL"
                  value={newAvatarUrl}
                  onChange={handleAvatarChange}
                  className="border border-gray-300 rounded p-2 w-64"
                  disabled={isUpdating}
                />
                <button
                  onClick={handleAvatarUpdate}
                  disabled={isUpdating || !newAvatarUrl}
                  className="mt-2 bg-btns text-white px-4 py-2 rounded hover:bg-amber-100 hover:text-black disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Avatar"}
                </button>
                {updateError && (
                  <p className="text-red-500 mt-2">{updateError}</p>
                )}
                {updateSuccess && (
                  <p className="text-green-500 mt-2">{updateSuccess}</p>
                )}
              </div>
              <p className="font-Montserrat font-semibold py-2">
                Bio:{" "}
                <span className="font-light">{authUser.bio || "No bio"}</span>
              </p>
            </div>
          </div>
        </div>
        {/* Rest of your component */}
        <div>
          <div className="mx-auto mb-10 w-fit md:max-w-full">
            <h1 className="font-Playfair text-2xl py-5 text-tiner font-medium">
              Your information
            </h1>
            <div className="flex flex-wrap justify-center md:justify-center bg-tin px-1 md:px-5 py-5 text-paleSand md:gap-20 shadow-2xl rounded-lg">
              <div>
                <div className="flex px-5 md:px-5 flex-col font-Montserrat py-5">
                  <p className="font-light mb-3">
                    <span className="font-semibold">Username: </span>
                    {authUser.name}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Email: </span>
                    {authUser.email}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Bio: </span>
                    {authUser.bio || "No bio"}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Venue Manager: </span>
                    {authUser.venueManager ? "Yes" : "No"}
                  </p>
                  {/* Add more user info as needed */}
                </div>
              </div>
              <div className="px-5 mb-3 items-center flex flex-col font-Montserrat">
                <h1 className="py-5">Register account as venue manager?</h1>
                {authUser.venueManager ? (
                  <p className="text-green-500">You are a Venue Manager.</p>
                ) : (
                  <button
                    onClick={handleBecomeVenueManager}
                    disabled={isBecomingVenueManager}
                    className={`bg-btns py-2 px-5 hover:bg-amber-100 hover:text-charcoal ${
                      isBecomingVenueManager
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isBecomingVenueManager
                      ? "Becoming Venue Manager..."
                      : "Become Venue Manager"}
                  </button>
                )}
                {updateError && (
                  <p className="text-red-500 mt-2">{updateError}</p>
                )}
                {updateSuccess && (
                  <p className="text-green-500 mt-2">{updateSuccess}</p>
                )}
              </div>
            </div>
          </div>
          {/* Active Listings Section */}
          <div className="px-5 w-fit mx-auto mb-10">
            <div className="flex justify-between gap-5">
              <h1 className="font-Playfair text-2xl text-tiner font-medium mr-5">
                Active listings
              </h1>
              <Link to="/createVenue">
                <div className="flex mt-1 cursor-pointer">
                  <img className="h-7" src={createIcon} alt="Create Icon" />
                  <p className="px-2 font-Montserrat mt-1 text-sm text-btns">
                    Create new listing
                  </p>
                </div>
              </Link>
            </div>

            {/* Display Listings */}
            {listingsError ? (
              <p className="text-red-500 mt-5">{listingsError}</p>
            ) : (
              <div className="mt-5 flex flex-wrap justify-center gap-5">
                {activeListings.length === 0 ? (
                  <p className="text-gray-500">No active listings found.</p>
                ) : (
                  activeListings.map((listing) => (
                    <div
                      key={listing.id}
                      className="bg-tin px-5 text-paleSand rounded-lg py-5 font-Montserrat"
                    >
                      <div className="flex justify-between py-2">
                        <h2 className="font-semibold text-lg text-paleSand">
                          {listing.name}
                        </h2>
                        <Link to={`/updateVenue/${listing.id}`}>
                          <button className="bg-btns text-white px-4 py-1 rounded hover:bg-amber-100 hover:text-charcoal text-sm">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteVenue(listing.id)}
                          className="bg-red-600 text-white px-4 rounded hover:bg-red-700"
                        >
                          <span className="px-1 text-sm">Delete</span>
                        </button>
                      </div>
                      <div className="mt-2 flex gap-2">
                        {listing.media.length > 0 && (
                          <img
                            src={listing.media[0].url}
                            alt={listing.media[0].alt}
                            className="h-32 w-52 object-cover rounded"
                          />
                        )}
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">
                            Price:{" "}
                            <span className="font-light">
                              {listing.price} NOK/night
                            </span>
                          </p>
                          <p className="font-medium text-sm">
                            Max Guests:{" "}
                            <span className="font-light">
                              {listing.maxGuests}
                            </span>
                          </p>
                          <p className="font-medium text-sm">
                            Rating:{" "}
                            <span className="font-light">{listing.rating}</span>
                          </p>
                        </div>
                      </div>
                      {/* Add Update and Delete Buttons */}
                      <div className="flex gap-4 mt-4"></div>
                    </div>
                  ))
                )}
              </div>
            )}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
