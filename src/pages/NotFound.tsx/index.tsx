import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-paleSand">
      <h1 className="text-4xl font-bold mb-4 text-tiner">
        404 - Page Not Found
      </h1>
      <p className="mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-btns text-white rounded-md hover:bg-amber-100 hover:text-black"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
