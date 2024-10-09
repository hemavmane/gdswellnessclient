import React, { useEffect, useState } from "react";
import "./Styles/Comp01.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Com01 = ({ data }) => {
    const [slid,setSlid] = useState(0);
  
    const nextSlide = () => {
      setSlid((prevSlide) =>
        prevSlide === data.length - 1 ? 0 : prevSlide + 1
      );
    };
  
    const prevSlide = () => {
      setSlid((prevSlide) =>
        prevSlide === 0 ?data.length - 1 : prevSlide - 1
      );
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000);
  
      return () => {
        clearInterval(interval);
      };
    }, [slid, data.length]);

     // Preload images
     useEffect(() => {
      data.forEach((item) => {
          const image = new Image();
          image.src = item.image;
      });
  }, [data]);
    
  return (
    <div className="Com01">
      <div className="carousel">
        <span onClick={prevSlide}></span>
        <span onClick={(nextSlide)}></span>
        {data.map((item, idx) => {
          return <img width={1000} height={800}  key={idx} src={item.image} alt={item.alt} className={slid===idx ?"slid":"slid slid-hidden"} />;
        })}
       
      </div>
    </div>
  );
};

export default Com01;
