import { Link } from "react-router-dom";
import facebookIcon from "../../assets/facebook.svg";
import instagramIcon from "../../assets/instagram.svg";
import twitterIcon from "../../assets/twitter.svg";
import emailIcon from "../../assets/email.svg";
import phoneIcon from "../../assets/phone.svg";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tiner text-paleSand py-8 font-Montserrat">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-light mb-2 font-Playfair">
              About <span className="font-Metamorphous">Holidaze</span>
            </h2>
            <p className="text-sm">
              Holidaze is your go-to platform for discovering and listing unique
              venues. Whether you're hosting a small gathering or a large event,
              we've got you covered.
            </p>
          </div>

          {/* Useful Links */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Useful Links</h2>
            <ul>
              <li className="mb-1">
                <Link to="/contact" className="hover:underline text-sm">
                  Contact
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/privacy" className="hover:underline text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/terms" className="hover:underline text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <ul>
              <li className="flex items-center mb-2">
                <img
                  src={phoneIcon}
                  alt="Phone Icon"
                  className="h-4 w-4 mr-2"
                />
                <span className="text-sm">+47 423 854 613</span>
              </li>
              <li className="flex items-center mb-2">
                <img
                  src={emailIcon}
                  alt="Email Icon"
                  className="h-4 w-4 mr-2"
                />
                <span className="text-sm">support@holidaze.com</span>
              </li>
              <li className="flex items-center">
                <img
                  src={emailIcon}
                  alt="Address Icon"
                  className="h-4 w-4 mr-2"
                />
                <span className="text-sm">Fagerborg gate 2, Oslo 1154</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm font-Metamorphous">
              <span className="font-Montserrat">© {currentYear}</span> Holidaze.{" "}
              <span className="font-Montserrat">All rights reserved</span>.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <img src={twitterIcon} alt="Twitter" className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
