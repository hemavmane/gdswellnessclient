import { useState, useEffect } from "react";
import "./Style/Contact.css";
import axios from "axios";
import { TextField, Button, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import * as Yup from "yup";
import ReactGA from "react-ga4";
import { IoIosCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { PiWhatsappLogoBold } from "react-icons/pi";

import { MdEmail } from "react-icons/md";

const TRACKING_ID = "G-PJ3ERX3LDC";

const API_LINK = "https://api.gdswellness.com";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    Phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    Phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    message: Yup.string().required("Message is required"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    if (!window.ga) {
      ReactGA.initialize(TRACKING_ID);
    }
    ReactGA.send({ hitType: "pageview", page: "/contact", title: "Contact" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const config = {
        url: "/contact/register",
        baseURL: `${API_LINK}/api`,
        method: "post",
        headers: { "Content-type": "application/json" },
        data: {
          email: formData.email,
          username: formData.name,
          phone: formData.Phone,
          message: formData.message,
        },
      };

      let response = await axios(config);

      if (response.status === 200) {
        emailjs
          .sendForm(
            "service_0c4e5dw",
            "template_mur6j98",
            e.target,
            "Q7nXQWJ2D9APCTJs_"
          )
          .then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          );
        alert("Message sent successfully");
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleGoogleEvent = (platform) => {
    ReactGA.event({
      category: "Contact Us Submit Button",
      action: "Click",
      label: platform,
    });
  };

  return (
    <>
      <div className="row m-auto mb-5 mt-4 ps-3 pe-3">
        <div>
          <h3 className="contact-title">Get In Touch</h3>
          <p>
            If you{"'"}ve got more than just a general enquiry, you can find
            details on how to reach us as given below.
          </p>
        </div>
        <div className="col-md-5 m-auto">
          <img className="contactus" src="./contact-us.png" />
          <div className="mt-4">
            {/* <h3 className="contact-title">Get In Touch</h3>
          <p>
            If you{"'"}ve got more than just a general enquiry, you can find
            details on how to reach us as given below.
          </p> */}
            {/* <div className="row ">
            <div className="col-xxl-6 col-lg-12 col-sm-6 contat-contaier">
              <div className="contact-detail-box mt-3">
                <div className="contact-icon">
                  <IoIosCall />
                </div>
                <div className="row contact-detail-title ">
                  <h5>Phone</h5>
                </div>
                <div className="row contact-detail-title">
                  <a href="tel:+1 732 742 6875">+1 732 742 6875</a>
                </div>
              </div>

              <div className="contact-detail-box mt-3">
                <div className="contact-icon">
                  <MdEmail />
                </div>
                <div className="row contact-detail-title">
                  <h5>Email</h5>
                </div>
                <div className="row contact-detail-title">
                  <a href="tel:+1 732 742 6875">Support@gdswellness.com</a>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
        <div className="col-md-5 ">
          {/* <h3 className="mb-3 ContactUsHeading">Contact Us</h3> */}
          <form onSubmit={handleSubmit} className="enquire-now">
            <Grid container spacing={3.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="contact-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                />

                {errors.name && <p className="ContactError">{errors.name}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="contact-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />

                {errors.email && <p className="ContactError">{errors.email}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="contact-input"
                  value={formData.Phone}
                  onChange={handleInputChange}
                  name="Phone"
                  placeholder="Phone"
                  variant="outlined"
                  fullWidth
                />

                {errors.Phone && <p className="ContactError">{errors.Phone}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="contact-input"
                  value={formData.message}
                  onChange={handleInputChange}
                  name="message"
                  placeholder="Message"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                />

                {errors.message && (
                  <p className="ContactError">{errors.message}</p>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#36a554",
                    width: "8.5rem",
                    textAlign: "center",
                  }}
                  onClick={() => handleGoogleEvent("contactUs")}
                >
                  Enquire Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
