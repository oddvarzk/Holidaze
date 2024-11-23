import React, { useState } from "react";
import { LoginData } from "../../../components/api/loginData"; // Corrected import path

export function LoginForm() {
  const [profile, setProfile] = useState({
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
      const accessToken = await LoginData(profile);
      setMessage("Login successful!");

      // Example: Save the access token in local storage or handle it somehow
      localStorage.setItem("accessToken", accessToken);

      // Optionally redirect the user or perform other actions
      // e.g., navigate to a dashboard or another page
      // This could be using window.location or your routing library
      window.location.href = "/profile";
    } catch (error) {
      setMessage(`Login failed: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-tiner min-h-screen">
      <form className="py-5 container mx-auto" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-center text-amber-100 font-Montserrat text-2xl py-5">
            Login to your account
          </h1>
          <div className="flex justify-center font-Montserrat gap-10 text-paleSand">
            <p className="py-2">Don't have an account?</p>
            <button
              type="button"
              className="bg-btns px-4 py-2 text-white rounded-md hover:bg-amber-100 hover:text-charcoal"
              onClick={() => (window.location.href = "/register")}
            >
              Register here
            </button>
          </div>
        </div>
        <div className="font-Montserrat w-full md:w-[60vh] px-4 lg:px-0 flex flex-col justify-center mx-auto mt-8">
          <p className="text-paleSand px-2">E-mail</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="block p-2 m-2 w-full rounded"
            pattern="^[\w\-.]+@(stud\.)?noroff\.no$"
            required
          />
          <p className="text-paleSand px-2">Password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleChange}
            className="block p-2 m-2 w-full rounded"
            minLength={8}
            required
          />
          <div className="px-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-btns hover:bg-amber-100 hover:text-charcoal text-white font-normal font-Montserrat text-sm py-2 px-4 w-32 rounded"
            >
              {loading ? "Creating your profile..." : "Register"}
            </button>
            {message && <p className="text-center text-paleSand">{message}</p>}
          </div>
        </div>
        <div className="w-full md:w-[60vh] px-4 lg:px-0 flex flex-col justify-center mx-auto mt-8">
          <ul className="list-none font-Montserrat mt-3">
            <li className="flex items-center text-paleSand text-sm py-1">
              <span className="text-gray-400 mr-2">•</span>
              E-mail must end with @stud.noroff.no or @noroff.no
            </li>
            <li className="flex items-center text-paleSand text-sm py-1">
              <span className="text-gray-400 mr-2">•</span>
              Password must have a minimum of 8 characters.
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
