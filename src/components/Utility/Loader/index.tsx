import React from "react";
import "../../../styles/loader.css";

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
