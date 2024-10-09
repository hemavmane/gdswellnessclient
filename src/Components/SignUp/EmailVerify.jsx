import { Link, useParams } from "react-router-dom";
import "./Style/SignUp.css";
import { useEffect, useState } from 'react';

import axios from "axios";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  console.log(param,"param")
  useEffect(() => {
    const VerifyEmail = async () => {
      try { 
        const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data,"data")
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    VerifyEmail()
  }, []);
  return (
    <>
      {validUrl ? (
        <div  className="email_verification_container">
          <img
            src="data:image/png;base64,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"
            alt="success_imag"
          />
          <h1>Email Verified Succesfully</h1>
          <Link to="/login">
            <button className="green_btn">Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not found</h1>
      )}
    </>
  );
};
export default EmailVerify