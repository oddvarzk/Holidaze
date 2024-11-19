import { useState, useEffect } from "react";
import greeceBackg from "../../assets/greeceBackg.jpg";
import CheckinData from "../../components/CheckinData";
import CheckoutData from "../../components/CheckoutData";
import planeIcon from "../../assets/plane.svg";
import palmTreeIcon from "../../assets/palmtree.svg";
import mapIcon from "../../assets/mapIcon.svg";

export function Home() {
  const words = ["Tranquility.", "Relax.", "Adventure.", "Explore.", "Peace."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div>
      <div
        className="relative bg-no-repeat bg-cover h-[50vh] w-full flex items-center justify-center bg-top sm:bg-center"
        style={{ backgroundImage: `url(${greeceBackg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-Montserrat font-normal text-white animate-pulse">
            {words[currentWordIndex]}
          </h1>
        </div>
      </div>
      <div className="flex justify-center gap-5 mb-5">
        <CheckinData />
        <CheckoutData />
      </div>
      <div className="text-center py-5 px-2 mt-5">
        <h1 className="font-Playfair text-tiner text-3xl py-2">
          Find your sanctuary
        </h1>
        <p className="font-Montserrat text-gray-500 font-light text-md mt-2 mx-auto max-w-4xl lg:max-w-4xl">
          Explore a curated collection of exquisite stays from around the globe.
          Whether you're seeking a tranquil beachfront bungalow, a cozy mountain
          retreat, or a vibrant cityscape condo, Holidaze connects you to the
          perfect destination.
        </p>
      </div>
      <div className="flex justify-center gap-20 py-5 px-2">
        <div className="px-2">
          <img src={planeIcon} alt="Plane Icon" className="h-28 w-28" />
        </div>
        <div className="px-2">
          <img src={palmTreeIcon} alt="Palm Tree Icon" className="h-28 w-28" />
        </div>
        <div className="px-2">
          <img src={mapIcon} alt="Map Icon" className="h-28 w-28" />
        </div>
      </div>
    </div>
  );
}

export default Home;
