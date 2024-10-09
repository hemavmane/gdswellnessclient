import React, { useState, useEffect } from "react";
import "./Styles/Comp01B.css"
import OurImpact01 from "../../Images/OurImpact01.png";
import OurImpact02 from "../../Images/OurImpact02.png";
import OurImpact03 from "../../Images/OurImpact03.png";
const Comp01B = () => {

    const [ count01, setCount01 ] = useState(0);
    const [ count02, setCount02 ] = useState(0);
    const [ count03, setCount03 ] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCount01((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount >= 300) {
              clearInterval(interval);
            }
    
            return newCount;
          });
        }, 2);
        return () => clearInterval(interval);
      }, []);

    useEffect(()=>{
       const interval= setInterval(()=>{
            setCount02((prevCount)=>{
               const newCount = prevCount + 110;
                if(newCount >= 31210){
                    clearInterval(interval)
                }
                return newCount;
            })
        },2)
        return ()=>clearInterval(interval);
    },[])  
    
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount03((prevCount)=>{
                const newCount = prevCount + 100;
                if(newCount >=8000){
                    clearInterval(interval)
                }
                return newCount;
            })
        },10)
        return ()=>clearInterval(interval)
    },[])
  return (
    <div className="Comp01B">
      <h1>Our Impact</h1>
      <div className="Comp01BWrapper">
        <div className="Comp01BWrapper01">
          <img src={OurImpact01} alt="image" />
          <div className="Comp01BWrapper01Count_Heading">
            <span>{count01}</span>
            <span>Cities Covered</span>
          </div>
        </div>

        <div className="Comp01BWrapper01">
          <img src={OurImpact02} alt="image" />
          <div className="Comp01BWrapper01Count_Heading">
            <span>{count02}</span>
            <span>Bottles Sold</span>
          </div>
        </div>

        <div className="Comp01BWrapper01">
          <img src={OurImpact03} alt="image" />
          <div className="Comp01BWrapper01Count_Heading">
            <span>{count03}</span>
            <span>Happy Customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comp01B;
