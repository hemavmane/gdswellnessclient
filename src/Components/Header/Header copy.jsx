import React, { useState } from "react";
import "./Style/Header.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
// import gdwlogo from "../Images/gdwlogo.webp";
// import gdwlogo1 from "../Images/gdwlogo1.png";

import ReactGA from "react-ga4";
const TRACKING_ID = "G-4BVCT6HLQG";

import gdwlogo2 from "../Images/gdwlogo2.png";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="HeaderNav">
      <div className="HeaderNavCompanyName">
        <NavLink to="/">
          <img
            className="healthconsultancyLogo"
            src={gdwlogo2}
            alt="LogoIcon"
          />
        </NavLink>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(!menuOpen)}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            // to = "https://shop.gdswellness.com/shop/"
            onClick={() => setMenuOpen(!menuOpen, "SHOP")}>
            SHOP
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={() => setMenuOpen(!menuOpen)}>
            ABOUT US
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" onClick={() => setMenuOpen(!menuOpen)}>
            CONTACT US
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cart/"
            onClick={() => setMenuOpen(!menuOpen)}>
            <PiShoppingCartSimpleBold style={{ fontSize: "25px" }} />
          </NavLink>
        </li>
      </ul>
      <div className="HeaderNavHamburger">
        {!menuOpen ? (
          <GiHamburgerMenu
            className="Hamburger"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        ) : (
          <IoCloseSharp
            className="CloseIcon"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Header;
