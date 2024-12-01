// src/components/Loader.tsx

import React from "react";
import "../../../styles/loader.css"; // Adjust the path to your Loader.css file

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-44">
      <div className="lds-roller text-tiner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
