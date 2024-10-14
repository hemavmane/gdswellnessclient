import React from "react";
import "./Style/Footer.css";
import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://api.gdswellness.com/">
        gdswellness.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  const navigate = useNavigate();
  return (
   <>
   <hr className="col-md-10 m-auto mt-3"/>
   <Copyright sx={{ mt: 8, mb: 4 }} />
    <div className="Footer">
      
      <div className="FooterCol01 FooterCol">
        <h3 className="FooterColHeading FooterColHeading01">Policy</h3>
        <ul className="FooterColInfo">
          <li onClick={() => navigate("/policy/ReturnPolicy")}>Return Policy</li>
          <li onClick={() => navigate("/policy/privacyPolicy")}>Privacy Policy</li>
          <li onClick={() => navigate("/policy/ShippingPolicy")}>Shipping Policy</li>
          <li onClick={() => navigate("/termsAndConditions")}>Terms & Conditions</li>
        </ul>
      </div>

      <div className="FooterCol02 FooterCol">
        <h3 className="FooterColHeading02 FooterColHeading">Follow Us</h3>
        <ul className="FooterColInfo">
          <li>Instagram</li>
          <li>Facebook</li>
          <li>Linkedin</li>
          <li>WhatsApp</li>
        </ul>
      </div>

      <div className="FooterCol03 FooterCol">
        <h3 className="FooterColHeading FooterColHeading03">Address</h3>
        <ul className="FooterColInfo">
          <li>GD WELLNESS LLC</li>
          <li>East Brunswick, New Jersey</li>
          <li>Phone : +1 732 742 6875</li>
          <li className="FooterColInfoEmail">Email : Support@gdswellness.com</li>
        </ul>
      </div>
      <hr/>
     
      {/* Our privacy policy © 2018-2024, Gdswellness. All Rights Reserved */}
    </div>
   </>
  );
};

export default Footer;
