import React,{ useEffect } from "react";
import "./Style/ReturnPolicy.css";
import { ReturnPolicyData } from "./Content/ReturnPolicy";
import { useNavigate } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";

import returnPolicyImage01 from "../Images/returnPolicyImage01.webp";

import ReactGA from "react-ga4";
const TRACKING_ID = "G-PJ3ERX3LDC"
const ReturnPolicy = () => {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/policy/ReturnPolicy", title: "Return Policy" });
}, [])

  const navigate = useNavigate();
  return (
    <div className="ReturnPolicy">
      <h1>
        <span onClick={() => navigate("/")}>Home</span>/
        <span>Return Policy</span>
      </h1>
      <img src={returnPolicyImage01} alt="" style={{width:"100%",height:"auto",marginBottom:"1.5rem"}}/>
      {ReturnPolicyData.map((policy, index) => (
        <article key={index} className="ReturnPolicyContentsWrapper">
          <p className="ReturnPolicyDescriptions">{policy.descriptions}</p>
          {policy.steps && (
            <ul className="ReturnPolicyPoints">
              {policy.steps.map((step, stepIndex) => (
                <li className="ReturnPolicyPoint" key={stepIndex}>
                  <FaHandPointRight className="ReturnPolicyPointsPointRight" />
                  {step.point}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
};

export default ReturnPolicy;
