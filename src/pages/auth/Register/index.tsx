import React, { useState } from "react";
import { RegisterData } from "../../../components/api/registerdata/index.tsx"; // Corrected import path

export function RegisterForm() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const accessToken = await RegisterData(profile);
      setMessage("Registration successful!");

      // Example: Save the access token in local storage or handle it somehow
      localStorage.setItem("accessToken", accessToken);

      // Optionally redirect the user or perform other actions
      // e.g., navigate to a dashboard or another page
      // This could be using window.location or your routing library
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(`Registration failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-tiner min-h-screen">
      <form className="py-5 container mx-auto" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-center text-amber-100 font-Playfair text-3xl py-5">
            Register account
          </h1>
          <div className="flex justify-center font-Montserrat gap-5 text-paleSand">
            <p className="py-1">Already have an account?</p>
            <button
              type="button"
              className="bg-btns px-2 h-8 shadow-xl hover:bg-amber-100 hover:text-charcoal"
            >
              Login here
            </button>
          </div>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={profile.name}
            onChange={handleChange}
            className="block p-2 m-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="block p-2 m-2 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleChange}
            className="block p-2 m-2 w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {message && <p className="text-center">{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
