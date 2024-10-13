import { Link, useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect, useState } from "react";
import axios from "axios";
import { MdError } from "react-icons/md";
import "./Style/SignUp.css";
import { FaCheckCircle } from "react-icons/fa";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const VerifyEmail = async () => {
      try {
        const url = `https://gdswellness.com/api/contact/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data, "data");
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    VerifyEmail();
  }, [param.id, param.token]);

  // Redirect after a 5-second delay based on verification result
  useEffect(() => {
    if (validUrl) {
      const timer = setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [validUrl, navigate]);

  return (
    <div className="email-verification-container">
      {validUrl ? (
        <div className="verification-success">
          <FaCheckCircle style={{ fontSize: "4rem", color: "green" }} />
          <h2>Email Verified Successfully!</h2>
          <p>Your email has been verified. You can now log in.</p>
          <Link to="/login" className="login-link">
            Go to Login
          </Link>
        </div>
      ) : (
        <div className="verification-failure">
          <MdError style={{ fontSize: "4rem", color: "red" }} /> 
          <h2>Verification Failed</h2>
          <p>The verification link is invalid or has expired.</p>
          <Link to="/registration" className="login-link">
            Resend Verification Email
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
