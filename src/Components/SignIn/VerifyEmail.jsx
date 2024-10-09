import React, { useState } from "react";
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
import {
  sendSignInLinkToEmail,
  signInWithPopup,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { IoLogoGoogle } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

const defaultTheme = createTheme();

const EmailVerification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [succesMessage, setsuccesMessage] = useState("");
  const [isEmail, setisEmail] = useState(false);
  const handleInput = e => {
    setEmail(e.target.value);
  };

  const handleSignInLink = async e => {
    e.preventDefault();
    const actionCodeSettings = {
      url: "https://gdswellness.com/registration",
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      toast.success(
        "Sign-in link sent! Check your email for further instructions."
      );
      setsuccesMessage(
        "A sign-in link has been sent to your email. Please check and follow the link to complete the process."
      );
    } catch (error) {
      setMessage(error.message);
      toast.error("Error sending sign-in link: " + error.message);
    }
  };

  React.useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        setMessage("Email not found. Please try again.");
        return;
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(result => {
          window.localStorage.removeItem("emailForSignIn");
          toast.success(`Welcome Thanks for signing up.`);
          navigate("/");
        })
        .catch(error => {
          setMessage(error.message);
          toast.error("Error signing in: " + error.message);
        });
    }
  }, [navigate]);

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is already registered in your system
      const checkUserRes = await axios.post({
        email: user.email,
      });

      // If the user is not registered, redirect them to a registration page
      if (checkUserRes.status === 404) {
        toast.error(
          "You need to register first before signing up with Google."
        );
        navigate("/register"); // Redirect to your registration page
        return;
      }

      // If the user is already registered, proceed with the login
      const isNewUser = result.additionalUserInfo?.isNewUser;

      if (isNewUser) {
        const registerRes = await axios.post(
          "https://api.gdswellness.com/api/contact/register",
          {
            email: user.email,
            username: user.displayName,
          }
        );

        if (registerRes.status === 200) {
          const loginResponse = await fetch(
            "https://api.gdswellness.com/api/contact/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: user.email }),
            }
          );

          const loginData = await loginResponse.json();

          if (loginResponse.status === 200) {
            localStorage.setItem("userdata", JSON.stringify(loginData.data));
            toast.success(
              `Welcome, ${loginData.username}! Thanks for signing up.`
            );
            navigate("/");
          } else {
            toast.error("Login failed, please try again.");
          }
        }
      } else {
        // Handle already registered users
        const loginResponse = await fetch(
          "https://api.gdswellness.com/api/contact/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );

        const loginData = await loginResponse.json();

        if (loginResponse.status === 200) {
          localStorage.setItem("userdata", JSON.stringify(loginData.data));
          toast.success(`Welcome back, ${loginData.username}!`);
          navigate("/");
        } else {
          toast.error("Login failed, please try again.");
        }
      }
    } catch (error) {
      console.error("Error during Google Sign-Up:", error);
      toast.error(`Google Sign-Up failed: ${error.message}`);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className="mb-5 email-verify">
          <CssBaseline />
          <Box
            sx={{
              mt: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {!isEmail ? (
              <>
                <a className="google-login row" onClick={handleGoogleSignUp}>
                  <IoLogoGoogle className="col-md-2 " />{" "}
                  <span className="col-md-7">Google</span>
                </a>
                <a
                  className="email-register mt-3 row"
                  onClick={() => setisEmail(true)}>
                  <MdOutlineMailOutline className="col-md-2 " />{" "}
                  <span className="col-md-8">Sign up with email</span>
                </a>
              </>
            ) : (
              <form onSubmit={handleSignInLink} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleInput}
                />
                <Button
                  type="submit"
                  className="mb-4 mt-3"
                  fullWidth
                  variant="contained">
                  Send Sign-In Link
                </Button>
                {succesMessage && (
                  <Typography color="succes">{message}</Typography>
                )}
                {message && <Typography color="error">{message}</Typography>}
              </form>
            )}
          </Box>
        </Container>
      </ThemeProvider>
      {/* <Footer /> */}
    </>
  );
};

export default EmailVerification;
