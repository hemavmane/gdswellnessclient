import React, { useState, useEffect } from "react";
// import loginImage from "../../../public/outline-mobile-login-via-phone-device.png";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style/SignIn.css";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

// import { googleAuth } from "../api";
// import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



const api = axios.create({
  baseURL: "https://api.gdswellness.com/api/contact",
});

const googleAuth = code => api.get(`/google?code=${code}`);
const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      if (id && token) {
        try {
          const url = `https://api.gdswellness.com/api/contact/${id}/verify/${token}`;
          const response = await axios.get(url);
          console.log("Verification success", response.data);
          setMsg("Email verified successfully!");
        } catch (error) {
          console.error("Error verifying email", error.response?.data);
          setError(error.response?.data?.message || "Verification failed.");
        }
      }
    };
    verifyEmail();
  }, [id, token]);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = "https://api.gdswellness.com/api/contact/emailsignin";
      const response = await axios.post(url, data);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location = "/";
      setMsg("Login successful!");
    } catch (error) {
      console.error("Login error", error.response?.data);
      setError(error.response?.data?.message || "Login failed.");
    }
  };
  // google sign in

  const responseGoogle = async authResult => {
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code);
        if (result.status === 200) {
          const { email, username, image } = result.data.user;
          const token = result.data.token;
          const obj = { email, username, token, image };
          localStorage.setItem("userdata", JSON.stringify(obj));
          window.location.href = "/";
        } else {
          throw new Error(result.data.message || "Login failed");
        }
      } else {
        console.error("Auth result is missing a code:", authResult);
        throw new Error("Authorization code is missing");
      }
    } catch (e) {
      console.error("Error during Google Login:", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div className="sign_login_container">
      <div className="sign_login_form_container">
        <div className="sign_left">
          <form className="sign_form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input_right"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input_right"
            />
            {error && <div className="error_msg">{error}</div>}
            {msg && <div className="success_msg">{msg}</div>}

            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>

          <div className="google-signup-container">
            <button className="google-signup-btn" onClick={googleLogin}>
              <FcGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
        <div className="sign_right">
          <h1>New Here?</h1>
          <Link to="/registration">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
