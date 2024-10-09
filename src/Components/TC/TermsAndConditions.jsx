import React,{ useEffect } from "react";
import "./Style/TermsAndConditions.css";
import { TCData } from "./Content/TermsAndConditions";
import { useNavigate } from "react-router";


import ReactGA from "react-ga4";
const TRACKING_ID = "G-PJ3ERX3LDC"
const TCComponent = ({ title, description }) => {
    if (Array.isArray(description)) {
      return (
        <article className="TCComponent">
          <h2>{title}</h2>
          {description.map((section, index) => (
            <div key={index} className="TCComponentDescriptionsTitleAndDescWrapper">
              <h4>{section.title}</h4>
              {section.descriptions.map((item, idx) => (
                <p key={idx}>{item.desc}</p>
              ))}
            </div>
          ))}
        </article>
      );
    } else if (typeof description === 'string') {
      return (
        <article className="TCComponent ">
          <h2>{title}</h2>
          <p>{description}</p>
        </article>
      );
    } else {
      return null;
    }
  };

const TermsAndConditions = () => {
useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/termsAndConditions", title: "T & C" });
}, [])
    const navigate = useNavigate()
  return (
    <div className="TermsAndConditions">
        <h1>
            <span onClick={()=>navigate("/")}>Home</span>/<span>Terms & Conditions</span>
        </h1>
      {TCData.map((item, index) => (
        <TCComponent
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default TermsAndConditions;
