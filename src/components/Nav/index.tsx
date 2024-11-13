import { useState } from "react";
import { Link } from "react-router-dom";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-amber-100">
      <button className="md:hidden p-2 py-5" onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <ul
        className={`flex-col font-normal font-Montserrat md:flex md:flex-row gap-10 px-5 py-4 mt-4 ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <li className="hover:underline">
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            List your property
          </Link>
        </li>
        <li className="hover:underline">
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About us
          </Link>
        </li>
        <li className="hover:underline">
          <Link to="/booking" onClick={() => setIsOpen(false)}>
            Booking
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className=" text-gray-500 font-medium py-2 px-4 bg-amber-100 hover:opacity-50"
          >
            Login
          </Link>
        </li>
        <li className="hover:underline">
          <Link to="/register" onClick={() => setIsOpen(false)}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
