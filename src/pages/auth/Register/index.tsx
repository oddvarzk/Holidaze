import React, { useState } from "react";
import { RegisterData } from "../../../components/api/auth/registerData";

interface Profile {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

export function RegisterForm() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Errors = {};

    // Validate name (no spaces or special characters)
    if (!profile.name) {
      newErrors.name = "Username is required.";
    } else if (!/^\w+$/.test(profile.name)) {
      newErrors.name = "Username cannot have spaces or special characters.";
    }

    // Validate email (must end with @stud.noroff.no or @noroff.no)
    if (!profile.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w\-.]+@(stud\.)?noroff\.no$/.test(profile.email)) {
      newErrors.email = "E-mail must end with @stud.noroff.no or @noroff.no.";
    }

    // Validate password (minimum 8 characters)
    if (!profile.password) {
      newErrors.password = "Password is required.";
    } else if (profile.password.length < 8) {
      newErrors.password = "Password must have a minimum of 8 characters.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      await RegisterData(profile); // Call RegisterData with name, email, password
      setMessage("Registration successful!");
      setTimeout(() => (window.location.href = "/login"), 2000);
    } catch (error: any) {
      // Handle API errors
      if (error.response && error.response.data && error.response.data.errors) {
        const apiErrors = error.response.data.errors;
        const newErrors: Errors = {};

        if (apiErrors.name) {
          newErrors.name = apiErrors.name[0];
        }
        if (apiErrors.email) {
          newErrors.email = apiErrors.email[0];
        }
        if (apiErrors.password) {
          newErrors.password = apiErrors.password[0];
        }
        setErrors(newErrors);
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-tiner min-h-screen">
      <form className="py-5 container mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-center text-amber-100 font-Montserrat text-2xl py-5">
          Register account
        </h1>
        <div className="flex justify-center font-Montserrat gap-5 text-paleSand mb-5">
          <p className="py-2 px-3">Already have an account?</p>
          <button
            type="button"
            className="bg-btns px-4 py-2 text-white rounded-md hover:bg-amber-100 hover:text-charcoal"
            onClick={() => (window.location.href = "/login")}
          >
            Login here
          </button>
        </div>

        <div className="font-Montserrat w-full md:w-[60vh] px-4 lg:px-0 flex flex-col justify-center mx-auto mt-8">
          {/* Username Field */}
          <label className="text-paleSand">Username</label>
          <input
            type="text"
            name="name"
            placeholder="your_username"
            value={profile.name}
            onChange={handleChange}
            className={`block p-2 border rounded w-full ${
              errors.name ? "border-red-500" : ""
            }`}
            maxLength={20}
            required
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          {/* Email Field */}
          <label className="text-paleSand mt-4">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className={`block p-2 border rounded w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            required
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          {/* Password Field */}
          <label className="text-paleSand mt-4">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleChange}
            className={`block p-2 border rounded w-full ${
              errors.password ? "border-red-500" : ""
            }`}
            minLength={8}
            required
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-btns hover:bg-amber-100 hover:text-charcoal text-white"
            }`}
          >
            {loading ? "Creating your profile..." : "Register"}
          </button>

          {/* General Error Message */}
          {errors.general && (
            <p className="text-red-500 text-center mt-4">{errors.general}</p>
          )}

          {/* Success Message */}
          {message && (
            <p className="text-green-600 text-center mt-4">{message}</p>
          )}

          {/* Validation Guidelines */}
          <div className="mt-8">
            <ul className="list-none font-Montserrat text-sm text-paleSand">
              <li className="flex items-center py-1">
                <span className="text-gray-400 mr-2">•</span> Username cannot
                have spaces or special characters.
              </li>
              <li className="flex items-center py-1">
                <span className="text-gray-400 mr-2">•</span> E-mail must end
                with @stud.noroff.no or @noroff.no.
              </li>
              <li className="flex items-center py-1">
                <span className="text-gray-400 mr-2">•</span> Password must have
                a minimum of 8 characters.
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
