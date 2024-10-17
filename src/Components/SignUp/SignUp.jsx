

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/SignUp.css";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

const api = axios.create({
  baseURL: "https://api.gdswellness.com/api/contact",
});

const googleAuth = code => api.get(`/google?code=${code}`);
const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  //  sign up with google

  const responseGoogle = async authResult => {
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code);

        if (result.status === 200) {
          localStorage.setItem("userdata", JSON.stringify(result.data.user));
          window.location.href = "/";
        } else {
          throw new Error(result.data.message || "Signup failed");
        }
      } else {
        console.error("Auth result is missing a code:", authResult);
        throw new Error("Authorization code is missing");
      }
    } catch (e) {
      if (e.response) {
        console.error("Server error:", e.response.status, e.response.data);
      } else if (e.request) {
        console.error("No response received:", e.request);
      } else {
        console.error("Error during request:", e.message);
      }
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  // signup with email
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = "https://api.gdswellness.com/api/contact/emailsignup";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      setData({ firstName: "", lastName: "", email: "", password: "" });
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sing in
            </button>
          </Link>
        </div>
        <div className="right">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input"
            />
            {error && <div className="error_msg">{error}</div>}
            {msg && <div className="success_msg">{msg}</div>}

            <button type="submit" className="green_btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="google-signup-container">
            <button className="google-signup-btn" onClick={googleSignup}>
              <FcGoogle className="google-icon" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
