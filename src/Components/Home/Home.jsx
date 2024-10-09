import React, { useEffect } from "react";
import "./Style/Home.css";
import Comp01 from "./Components/Comp01";
import Comp02 from "./Components/Comp02";
import Comp03 from "./Components/Comp03";
// import Comp04 from "./Components/Comp04";
import { Comp01Data } from "./Contents/Comp01Data";
import { Comp02Data } from "./Contents/Comp02Data";
// import { Comp04Data } from "./Contents/Comp04Data";
// import gdwimage from "../Images/gdwimage.jpg"
import TabsTitle from "../Utils/TabsTitle";

import ReactGA from "react-ga4";
import Comp01A from "./Components/Comp01A";
import FeaturedProducts from "./Components/FeaturedProducts";
import Comp01B from "./Components/Comp01B";
import Comp01C from "./Components/Comp01C";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import EnquiryNow from "./Components/Comp04";
const TRACKING_ID = "G-PJ3ERX3LDC";

const Home = () => {
  // TabsTitle("Health Consultancy : We care for your health!");
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home" });
  }, []);

  return (
    <>
      {/* <Header /> */}
      <div className="Home">
        <Comp01A />
        <FeaturedProducts />
        <Comp02 data={Comp02Data} />
        {/* <Comp01B /> */}
        {/* <EnquiryNow/>  */}
        <Comp01C />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
