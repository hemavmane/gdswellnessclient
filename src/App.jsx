import React, { useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./App.css";

import { useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import ReactGA from "react-ga4";
import ShippingPolicy from "./Components/ShippingPolicy/ShippingPolicy";
import Shopping from "./Components/Shopping/Shopping";
import Product from "./Components/Product/Product";
const TRACKING_ID = "G-PJ3ERX3LDC";

ReactGA.initialize(TRACKING_ID);
const Home = React.lazy(() => import("./Components/Home/Home"));
const Contact = React.lazy(() => import("./Components/Contact/Contact"));
const About = React.lazy(() => import("./Components/About/About"));
const PrivacyPolicy = React.lazy(() =>
  import("./Components/PrivacyPolicy/PrivacyPolicy")
);
const ReturnPolicy = React.lazy(() =>
  import("./Components/ReturnPolicy/ReturnPolicy")
);
const TermsAndConditions = React.lazy(() =>
  import("./Components/TC/TermsAndConditions")
);
import "bootstrap/dist/css/bootstrap.min.css";
import CartData from "./Components/Cart/cart";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Checkout from "./Components/Checkout/checkout";
import Failure from "./Components/Failure/Failure";
import Success from "./Components/Success/Success";
import OrderHitory from "./Components/Order/OrderHitory";
import EmailVerification from "./Components/SignIn/VerifyEmail";
import EmailVerify from "./Components/SignUp/EmailVerify";

const Error = React.lazy(() => import("./Components/Error/Error"));

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  const user = localStorage.getItem("token");
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/policy/ReturnPolicy" element={<ReturnPolicy />} />
          <Route path="/policy/ShippingPolicy" element={<ShippingPolicy />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/shop" element={<Shopping />} />
          <Route path="/product/:productname_slug" element={<Product />} />
          <Route path="/cart" element={<CartData />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/order" element={<OrderHitory />} />
          <Route path="/verify-email" element={<EmailVerification />} />

          {/* nodemailer */}
          {/* {user && <Route path="/" exact element={<Main />} />} */}
          <Route path="/registration" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
