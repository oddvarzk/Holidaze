import React, { useState } from "react";
import { LoginData } from "../../../components/api/auth/loginData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/context/authContext/index.tsx";

interface Credentials {
  email: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // State to hold validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Client-side validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate email
    const emailPattern = /^[\w\-.]+@(stud\.)?noroff\.no$/;
    if (!credentials.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(credentials.email)) {
      newErrors.email = "Email must end with @stud.noroff.no.";
    }

    // Validate password
    if (!credentials.password) {
      newErrors.password = "Password is required.";
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    const isValid = validate();

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const { accessToken, user } = await LoginData(credentials);
      setMessage("Login successful!");

      // AuthProvider's login function to update context and storage
      login(accessToken, user);

      // Redirect the user to the profile page
      navigate("/profile");
    } catch (error: any) {
      setLoading(false);
      console.error("Login error:", error);

      // Handle server-side errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(`Login failed: ${error.response.data.message}`);
      } else if (error.message) {
        setMessage(`Login failed: ${error.message}`);
      } else {
        setMessage("Login failed: An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-tiner min-h-screen">
      <form className="py-5 container mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-center text-amber-100 font-Montserrat text-2xl py-5">
          Login to your account
        </h1>
        <div className="flex justify-center font-Montserrat gap-5 text-paleSand mb-5">
          <p className="py-2">Don't have an account?</p>
          <button
            type="button"
            className="bg-btns px-4 py-2 text-white rounded-md hover:bg-amber-100 hover:text-charcoal"
            onClick={() => navigate("/register")}
          >
            Register here
          </button>
        </div>

        <div className="font-Montserrat w-full md:w-[60vh] px-4 lg:px-0 flex flex-col justify-center mx-auto mt-8">
          <label className="text-paleSand">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className={`block p-2 border rounded w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            required
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}

          <label className="text-paleSand mt-4">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className={`block p-2 border rounded w-full ${
              errors.password ? "border-red-500" : ""
            }`}
            minLength={8}
            required
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-btns hover:bg-amber-100 hover:text-charcoal text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-8">
            <ul className="list-none font-Montserrat text-sm text-paleSand">
              <li className="flex items-center py-1">
                <span className="text-gray-400 mr-2">•</span>
                E-mail must end with @stud.noroff.no.
              </li>
              <li className="flex items-center py-1">
                <span className="text-gray-400 mr-2">•</span>
                Password must have a minimum of 8 characters.
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
