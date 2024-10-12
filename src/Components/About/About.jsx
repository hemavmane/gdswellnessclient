import React,{ useEffect } from "react";
import "./Style/About.css";
import aboutusimage01 from "../Images/aboutusimage01.png";
import abtimg02 from "../Images/abtimg02.png";

import aboutusimage03 from "../Images/aboutusimage03.png";
import aboutusimage04 from "../Images/aboutusimage04.png";
import { useNavigate } from "react-router-dom";
import { abtData01 } from "./Content/AboutContent";
import { abtData02 } from "./Content/AboutContent";
import { abtData03 } from "./Content/AboutContent";

import ReactGA from "react-ga4";

const TRACKING_ID = "G-PJ3ERX3LDC"

const About = () => {

useEffect(()=>{
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send({ hitType: "pageview", page: "/about", title: "About Us" });
},[])
  const navigate = useNavigate();
  return (
    <>
 
    
    <div className="About">
      {/* <h1>
        <span onClick={() => navigate("/")}>Home</span>/<span>About Us</span>
      </h1> */}
      <img src={aboutusimage01} alt="aboutusimage01" className="AboutImage01" />



      <div className="AboutContainerA">
        <div className="AboutContainerA_Left">
          <div className="AboutContainerA_Left_Heading_And_Icon">
            
            <img src={abtimg02} alt="aboutusimage02" />
            <h1>Our Story</h1>
          </div>
          <p>At GDS Wellness, we believe in enhancing wellness and empowering individuals to embrace good health with an eye on chemical free products with confidence. We're more than just an online store; we're a passionate team dedicated to fostering positive wellness experiences. We meticulously choose products from reputable brands known for safety, innovation, and effectiveness. We prioritise health and cater to a wide range of products. We understand that wellness is a spectrum, and individual needs are diverse and therefore we continuously keep adding products for a wide variety of consumers. That's why we curate a wide range of high-quality wellness products from a variety of trusted brands. Whether you're a seasoned explorer or just starting your journey, we have something for everyone.</p>
        </div>
        <div className="AboutContainerA_Right">
          <div className="AboutContainerA_Right_Top">
            <div className="AboutContainerA_Right_Top_HeadingAndIcon">
              
              <img src={aboutusimage03} alt="who we are" />
              <p>Who We Are</p>      
            </div>
            <p>GDS Wellness Is a leading provider of plant based wellness products designed to give you a complete natural health and wellness regime. Our team is dedicated to curating a diverse range of high-quality products that cater to the needs and desires of our customers.</p>
          </div>
          <div className="AboutContainerA_Right_Bottom">
            <div className="AboutContainerA_Right_Bottom_HeadingAndIcon">
              <img  src={aboutusimage04} alt="our mission" />
              <p>Our Mission</p>
            </div>
            <p>Our mission is to promote well-being through education, innovation, and empowerment. We strive to break down barriers and stigmas surrounding, creating a safe and welcoming space for exploration and self-discovery.</p>
          </div>
        </div>
      </div>

      <div className="AboutContainer02">
        <div className="AboutContainer02SubContainer01">
          <p>We Achieve This By</p>
          <div className="AboutContainer02SubContainer01HeadingsAndDescriptions">
            {abtData02.map((ele, ind) => {
              return (
                <div key={ind}>
                  <article>
                    <img src={ele.image} alt="" style={{ width: "4.5rem" }} />
                    <h3>{ele.title}</h3>
                    <p>{ele.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <div className="AboutContainer02SubContainer02">
          <p>Why Choose GDWellness</p>
          <div className="AboutContainer02SubContainer02HeadingsAndDescriptions">
            {abtData03.map((ele, ind) => {
              return (
                <div key={ind}>
                  <article>
                    <img src={ele.image} alt="" style={{ width: "4.5rem" }} />
                    <h3>{ele.title}</h3>
                    <p>{ele.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div className="AboutContainer03" >
        <p>
        At GDS Wellness, we believe that wellness is an essential component of overall well-being. Join us on a journey of chemical free nutrients that will supplement your health needs. Welcome to a world of endless possibilities. For any suggestions or feedback or any new product that you may have on your mind, please feel free to speak to one of our Customer Support Executives over the phone or email us support@gdswellness.com and we will definitely help you out with your request.
        </p>
        <img src={aboutimage01} alt="" style={{width:"100%",height:"auto"}} />
      </div> */}
    </div>
  
    </>
  );
};

export default About;
