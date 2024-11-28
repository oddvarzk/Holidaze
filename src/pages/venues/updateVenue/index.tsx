// src/components/UpdateVenuePage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import updateVenue from "../../../components/api/user/updateVenue";
import getActiveListings from "../../../components/api/user/activeListings";
import { load } from "../../../components/storage";
import { CreateVenueFormValues } from "../../../types/CreateVenueTypes";

const UpdateVenuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the venue ID from the route params
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateVenueFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "media" });

  useEffect(() => {
    // Fetch the venue data for pre-filling the form
    const fetchVenueData = async () => {
      try {
        const storedUser = load("user");
        if (!storedUser) {
          throw new Error("User not found. Please log in again.");
        }

        const response = await getActiveListings(storedUser.name);
        const venueData = response.find((venue) => venue.id === id);

        if (venueData) {
          Object.entries(venueData).forEach(([key, value]) => {
            setValue(key as keyof CreateVenueFormValues, value);
          });
        } else {
          setError("Venue not found.");
        }
      } catch (e) {
        setError("Failed to load venue details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<CreateVenueFormValues> = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      await updateVenue(id!, data);
      setSubmitSuccess("Venue updated successfully!");
    } catch (error: any) {
      setSubmitError(error.message || "Failed to update venue.");
    }
  };

  if (loading) {
    return <p>Loading venue details...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="py-5 px-5 mt-5 max-w-4xl mx-auto">
      <div className="px-5 font-Montserrat">
        <h1 className="text-2xl font-semibold mb-4 text-center text-tin">
          Update Venue
        </h1>
      </div>
      <div className="bg-tiner rounded-2xl font-Montserrat p-6 shadow-lg">
        <h2 className="text-center text-amber-100 font-Playfair text-2xl py-2 mb-6">
          Venue Details
        </h2>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {submitSuccess}
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Basic Information Section */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-paleSand font-medium mb-1"
              >
                Venue Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Venue name is required.",
                  minLength: {
                    value: 3,
                    message: "Venue name must be at least 3 characters long.",
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter venue name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-paleSand font-medium mb-1"
              >
                Description<span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required.",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long.",
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter venue description"
                rows={4}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-paleSand font-medium mb-1"
              >
                Price<span className="text-red-500">*</span> (per night)
              </label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Price is required.",
                  min: {
                    value: 0,
                    message: "Price cannot be negative.",
                  },
                  valueAsNumber: true,
                })}
                className={`w-full px-3 py-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Max Guests */}
            <div>
              <label
                htmlFor="maxGuests"
                className="block text-paleSand font-medium mb-1"
              >
                Maximum Guests<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="maxGuests"
                {...register("maxGuests", {
                  required: "Maximum number of guests is required.",
                  min: {
                    value: 1,
                    message: "At least one guest is required.",
                  },
                  valueAsNumber: true,
                })}
                className={`w-full px-3 py-2 border ${
                  errors.maxGuests ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter maximum number of guests"
              />
              {errors.maxGuests && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maxGuests.message}
                </p>
              )}
            </div>
          </div>

          {/* Media Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-paleSand mb-4">
              Media (Optional)
            </h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center mb-4">
                <div className="w-5/6 mr-4">
                  <input
                    type="url"
                    {...register(`media.${index}.url` as const, {
                      pattern: {
                        value: /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg)$/,
                        message: "Please enter a valid image URL.",
                      },
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.media && errors.media[index]?.url
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Image URL"
                  />
                  {errors.media && errors.media[index]?.url && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.media[index]?.url?.message}
                    </p>
                  )}
                </div>

                <div className="w-5/6 mr-4">
                  <input
                    type="text"
                    {...register(`media.${index}.alt` as const, {
                      required: "Alt text is required.",
                      minLength: {
                        value: 3,
                        message: "Alt text must be at least 3 characters long.",
                      },
                    })}
                    className={`w-full px-3 py-2 border ${
                      errors.media && errors.media[index]?.alt
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Alt Text"
                  />
                  {errors.media && errors.media[index]?.alt && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.media[index]?.alt?.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ url: "", alt: "" })}
              className="mt-2 bg-btns text-white px-4 py-2 rounded-md hover:bg-amber-100 hover:text-charcoal transition-colors"
            >
              Add Media
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-btns text-white px-6 py-2 rounded-md hover:bg-amber-100 hover:text-black transition-colors duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Venue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVenuePage;
