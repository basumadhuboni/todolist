import React, { useEffect, useRef } from 'react';
import RainyDay from './rainyday'; // Assuming you've moved rainyday.js to your src folder
import './RainAnimation.css';

const RainAnimation = () => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const rain = () => {
      const image = backgroundRef.current;
      
      image.onload = function() {
        var rainyDay = new RainyDay({
          image: this,
          blur: 10,
          opacity: 1,
          fps: 30,
          speed: 1
        });
        
        RainyDay.rain([
          [3, 2, null],
          [2, 1, null]
        ], 100);
      };
      
      image.src = 'pic2.jpg'; // Make sure this image is in your public folder
    };

    rain();
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <img 
        ref={backgroundRef}
        id="background" 
        alt="background" 
        style={{ width: '100%' }}
      />
    </section>
  );
};

export default RainAnimation;