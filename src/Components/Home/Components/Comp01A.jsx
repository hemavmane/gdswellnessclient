import React from "react";
import "./Styles/Comp01A.css";
import { useNavigate } from "react-router";
const Comp01A = () => {
  const navigate  = useNavigate();
  return (
    <div className="Comp01A">
      <div className="Comp01ALeft">
        <h1>G<span style={{color:"#36AA55"}}>D</span>S WELLNESS</h1>
        <h2>BEST IN THE BUSINESS</h2>
      </div>
      <div className="Comp01Right">
        <div style={{width:"60px",height:"4px",backgroundColor:"#36AA55",marginBottom:"15px"}}></div>
        <p>
          GDS Wellness has been a leading innovator in the nutrition industry
          for many years, constantly innovating and expanding our business to
          make sure we are always providing the best possible products and
          services to our customers. We are committed to supporting natural food
          retailers with an award-winning line of products they can trust.
        </p>
        <button onClick={()=>navigate("/about")}>Know About US</button>
      </div>

    </div>
  );
};

export default Comp01A;
