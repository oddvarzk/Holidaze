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
    <div
      className="bg-no-repeat bg-[position:20%_60%] bg-[length:100%] h-[40vh] w-full flex items-center justify-center"
      style={{ backgroundImage: `url(${greeceBackg})` }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-Montserrat font-normal text-white animate-fadeIn">{words[currentWordIndex]}</h1>
      </div>
    </div>
  );
}

export default Home;


