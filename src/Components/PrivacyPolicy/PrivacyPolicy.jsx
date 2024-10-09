import React,{  useEffect } from 'react';
import "./Style/PrivacyPolicy.css"
import { PrivacyPolicyData } from './Content/PrivacyPolicyConent';
import { useNavigate } from 'react-router';

import ReactGA from "react-ga4";
const TRACKING_ID = "G-PJ3ERX3LDC"


const PrivacyPolicy = () => {
  useEffect(()=>{
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: "/policy/privacyPolicy", title: "Privacy Policy" });
  },[])

  const navigate = useNavigate();
  return (
    <div className='PrivacyPolicy'>
      <h1>
        <span onClick={()=>navigate("/")}>Home</span>/<span>Privacy Policy</span>
      </h1>
      {
        PrivacyPolicyData.map((ele,ind)=>{
          return <article key={ind} className='PrivacyPolicyArticle'>
            <h1>{ele.title}</h1>
            <p>{ele.description}</p>
          </article>
        })
      }
    </div>
  )
}

export default PrivacyPolicy