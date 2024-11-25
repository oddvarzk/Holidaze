// src/components/MyProfile.tsx

import React, { useEffect, useState } from "react";
import { load, save } from "../../../components/storage";
import { editProfile } from "../../../components/api/user/editProfile"; // Import the corrected API function
import createIcon from "../../../assets/createIcon.svg";
import example from "../../../assets/example.png"; // Ensure this import exists

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
  venueManager: boolean; // Now required based on earlier implementation
}

export function MyProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string>("");
  const [updateSuccess, setUpdateSuccess] = useState<string>("");
  const [isBecomingVenueManager, setIsBecomingVenueManager] =
    useState<boolean>(false);

  useEffect(() => {
    const userData = load("user");
    if (userData) {
      setUser(userData);
    } else {
      // Redirect to login if user data is not available
      window.location.href = "/login";
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAvatarUrl(e.target.value);
  };

  const handleAvatarUpdate = async () => {
    if (!user) return;

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
      const accessToken = load("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const response = await editProfile(user.name, {
        avatar: {
          url: newAvatarUrl,
          alt: `${user.name}'s avatar`,
        },
      });

      // Update user data in state and local storage
      const updatedUser: User = {
        ...user,
        avatar: response.data.avatar,
      };
      setUser(updatedUser);
      save("user", updatedUser);

      // Set success message
      setUpdateSuccess("Avatar updated successfully!");

      // Clear the input field
      setNewAvatarUrl("");
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update avatar.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBecomeVenueManager = async () => {
    if (!user) return;

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
      const accessToken = load("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const response = await editProfile(user.name, {
        venueManager: true,
      });

      // Update user data in state and local storage
      const updatedUser: User = {
        ...user,
        venueManager: response.data.venueManager,
      };
      setUser(updatedUser);
      save("user", updatedUser);

      // Set success message
      setUpdateSuccess("You are now a Venue Manager!");

      // Optionally, redirect to venue manager dashboard
      // window.location.href = "/venue-manager-dashboard";
    } catch (error: any) {
      setUpdateError(error.message || "Failed to update role.");
    } finally {
      setIsBecomingVenueManager(false);
    }
  };

  if (!user) {
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
                src={user.avatar?.url || example}
                alt={user.avatar?.alt || "Profile Avatar"}
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
                Bio: <span className="font-light">{user.bio || "No bio"}</span>
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
                    {user.name}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Email: </span>
                    {user.email}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Bio: </span>
                    {user.bio || "No bio"}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Venue Manager: </span>
                    {user.venueManager ? "Yes" : "No"}
                  </p>
                  {/* Add more user info as needed */}
                </div>
              </div>
              <div className="px-5 mb-3 items-center flex flex-col font-Montserrat">
                <h1 className="py-5">Register account as venue manager?</h1>
                {user.venueManager ? (
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
            <div className="flex flex-row gap-5">
              <h1 className="font-Playfair text-2xl text-tiner font-medium">
                Active listings
              </h1>
              <div className="flex mt-1">
                <img className="h-7" src={createIcon} alt="Create Icon" />
                <p className="px-1 font-Montserrat mt-1 text-sm text-btns">
                  Create listing
                </p>
              </div>
            </div>
            {/* Add listings here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
