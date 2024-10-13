// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   Link,
//   Grid,
//   Box,
//   Typography,
//   Container,
// } from "@mui/material";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const defaultTheme = createTheme();

// const SignUp = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//     },

//     validationSchema: Yup.object({
//       name: Yup.string().required("Name is required"),
//       email: Yup.string()
//         .required("Email is required")
//         .email("Invalid email format"),
//       phone: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .required("Password is required")
//         .min(8, "Password must be at least 8 characters")
//         .matches(
//           /[!@#$%^&*(),.?":{}|<>]/,
//           "Password must contain at least one symbol"
//         )
//         .matches(/[0-9]/, "Password must contain at least one number")
//         .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//         .matches(
//           /[a-z]/,
//           "Password must contain at least one lowercase letter"
//         ),
//     }),

//     onSubmit: async values => {
//       try {
//         const response = await axios.post(
//           "https://api.gdswellness.com/api/contact/register",
//           {
//             phone: values.phone,
//             email: values.email,
//             password: values.password,
//             username: values.name,
//           }
//         );
//         alert(response.data.message);
//         window.location.assign("/");
//       } catch (error) {
//         console.error("Registration error", error);
//       }
//     },
//   });

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}>
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={formik.handleSubmit}
//             sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="name"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.name}
//                   required
//                   fullWidth
//                   id="name"
//                   placeholder="Name"
//                   autoFocus
//                 />
//                 {formik.touched.name && formik.errors.name && (
//                   <Typography className="errorMessage">
//                     {formik.errors.name}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                   placeholder="Email"
//                   name="email"
//                   autoComplete="email"
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <Typography className="errorMessage">
//                     {formik.errors.email}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="phone"
//                   placeholder="Phone"
//                   name="phone"
//                   autoComplete="phone"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.phone}
//                 />
//                 {formik.touched.phone && formik.errors.phone && (
//                   <Typography className="errorMessage">
//                     {formik.errors.phone}
//                   </Typography>
//                 )}
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                   placeholder="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <Typography className="errorMessage">
//                     {formik.errors.password}
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}>
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-center">
//               <Grid item>
//                 <Link href="/login" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default SignUp;

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/SignUp.css";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { googleAuth } from "../api";
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
          const { email, username, image } = result.data.user;
          const token = result.data.token;
          const obj = { email, username, token, image };
          localStorage.setItem("userdata", JSON.stringify(obj));
          window.location.href = "/";
        } else {
          throw new Error(result.data.message || "Signup failed");
        }
      } else {
        console.error("Auth result is missing a code:", authResult);
        throw new Error("Authorization code is missing");
      }
    } catch (e) {
      console.error("Error during Google Signup:", e);
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
    setLoading(true); // Start loading
    try {
      const url = "https://gdswellness.com/api/contact/emailsignup";
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
      setLoading(false); // Stop loading
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
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
