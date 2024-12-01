import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import {
  CreateVenueFormValues,
  CreateVenueResponse,
} from "../../../types/CreateVenueTypes";
import { createVenue } from "../../../components/api/venues/createVenue";

export function CreateVenueForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateVenueFormValues>({
    defaultValues: {
      name: "",
      description: "",
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateVenueFormValues> = async (data) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      const response: CreateVenueResponse = await createVenue(data);
      setSubmitSuccess(`Venue "${response.data.name}" created successfully!`);
      reset();
    } catch (error: any) {
      setSubmitError(error.message || "Failed to create venue.");
    }
  };

  return (
    <div className="py-5 px-5 mt-5 max-w-4xl mx-auto">
      <div className="px-5 font-Montserrat">
        <h1 className="text-2xl font-semibold mb-4 text-center text-tin">
          Create a New Venue
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

            {/* Rating */}
            <div>
              <label
                htmlFor="rating"
                className="block text-paleSand font-medium mb-1"
              >
                Rating (Optional)
              </label>
              <input
                type="number"
                id="rating"
                {...register("rating", {
                  min: {
                    value: 0,
                    message: "Rating cannot be negative.",
                  },
                  max: {
                    value: 5,
                    message: "Rating cannot exceed 5.",
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.rating ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter rating (0-5)"
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
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
                  {/* Media URL */}
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
                  {/* Media Alt Text */}
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

          {/* Meta Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-paleSand mb-4">
              Amenities (Optional)
            </h3>
            <div className="flex items-center space-x-6">
              <div>
                <input
                  type="checkbox"
                  id="wifi"
                  {...register("meta.wifi")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="wifi" className="ml-2 text-paleSand">
                  WiFi
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="parking"
                  {...register("meta.parking")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="parking" className="ml-2 text-paleSand">
                  Parking
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="breakfast"
                  {...register("meta.breakfast")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="breakfast" className="ml-2 text-paleSand">
                  Breakfast
                </label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="pets"
                  {...register("meta.pets")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="pets" className="ml-2 text-paleSand">
                  Pets Allowed
                </label>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-paleSand mb-4">
              Location (Optional)
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-paleSand font-medium mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("location.address")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-paleSand font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("location.city")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>

              {/* ZIP */}
              <div>
                <label
                  htmlFor="zip"
                  className="block text-paleSand font-medium mb-1"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  {...register("location.zip")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ZIP code"
                />
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-paleSand font-medium mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("location.country")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter country"
                />
              </div>
            </div>
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
              {isSubmitting ? "Creating..." : "Create Venue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVenueForm;
