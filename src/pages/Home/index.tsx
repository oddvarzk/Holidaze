import { useState, useEffect } from 'react';
import greeceBackg from '../../assets/greeceBackg.jpg';

export function Home() {
  const words = ['Tranquility.', 'Relax.', 'Adventure.', 'Explore.', 'Peace.'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div>
      <div className="relative bg-no-repeat bg-cover h-[50vh] w-full flex items-center justify-center bg-top sm:bg-center"
          style={{ backgroundImage: `url(${greeceBackg})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-Montserrat font-normal text-white animate-pulse">
            {words[currentWordIndex]}
          </h1>
        </div>
      </div>
    </div>



  );
}

export default Home;


