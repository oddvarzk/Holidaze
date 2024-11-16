import { useState } from "react";
import { Link } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-amber-100">
      {/* Animated Hamburger Button */}
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.button
          initial={false}
          animate={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative h-20 w-20 rounded-full bg-white/0 transition-colors hover:bg-white/20 md:hidden"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-1 w-10 bg-white"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-1 w-10 bg-white"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-1 w-5 bg-white"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "calc(50% + 10px)",
            }}
          />
        </motion.button>
      </MotionConfig>

      {/* Navigation Links */}
      <ul
        className={`flex-col font-normal font-Montserrat md:flex md:flex-row gap-10 px-5 py-4 mt-4 ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <li className="hover:underline">
          <Link to="/createVenue" onClick={() => setIsOpen(false)}>
            List your venue
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
            className="text-gray-500 font-medium py-2 px-4 bg-amber-100 hover:opacity-50"
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

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};

export default Nav;

