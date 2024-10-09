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

// import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// const URL = "https://api.gdswellness.com/api/contact/login";
// const defaultTheme = createTheme();

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://gdswellness.com/">
//         gdswellness.com
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setUser({
//       ...user,
//       [name]: value,
//     });
//   };

//   const handlePost = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });

//       const res_data = await response.json();

//       if (response.status === 200) {
//         localStorage.setItem("token", res_data.token);
//         setUser({ email: "", password: "" });
//         alert(res_data.message);
//         localStorage.setItem("userdata", JSON.stringify(res_data.data));
//         navigate("/");
//       } else if (response.status === 400) {
//         alert("Login failed: Please enter the correct email and password.");
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while trying to log in.");
//     }
//   };

//   return (
//     <div className="login-container col-md-8 m-auto shadow">
//       <div className="d-flex p-3">
//         {/* <img src={loginImage} className="LoginImage"/> */}

//         <ThemeProvider theme={defaultTheme}>
//           <Container component="main" maxWidth="" className="p-5 p-sm-1">
//             {/* <CssBaseline /> */}
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Avatar
//                 sx={{ m: 1, width: "6rem", height: "6rem" }}
//                 src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
//               ></Avatar>
//               <h2 className="LoginHeading">Welcome!</h2>

//               <Typography
//                 component="h1"
//                 variant="h5"
//                 sx={{
//                   fontSize: {
//                     xs: "16px",
//                     sm: "18px",
//                     md: "20px",
//                     lg: "24px",
//                     xl: "28px",
//                   },
//                   fontWeight: 500,
//                   fontFamily: '"Poppins", system-ui',
//                   textAlign: "center",
//                   mt: { xs: 1, md: 1 },
//                    // margin-top: 2 for small screens, 4 for medium and above
//                 }}
//               >
//                 Log in to continue your shopping journey
//               </Typography>

//               <Box
//                 component="form"
//                 onSubmit={handlePost}
//                 noValidate
//                 sx={{ mt: 1 }}
//               >
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleInput}
//                   autoComplete="email"
//                   autoFocus
//                   placeholder="Email"
//                 />
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   name="password"
//                   value={user.password}
//                   onChange={handleInput}
//                   type="password"
//                   id="password"
//                   autoComplete="current-password"
//                   placeholder="Password"
//                 />
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   className="login"
//                   sx={{ mt: 3, mb: 2 }}
//                 >
//                   Login
//                 </Button>
//                 {message && <Typography color="error">{message}</Typography>}
//                 <Grid container>
//                   <Grid item>
//                     <Link href="/verify-email" variant="body2">
//                       {"Don't have an account? Sign Up"}
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Container>
//         </ThemeProvider>
//       </div>{" "}
//       <div></div>
//     </div>
//   );
// };

// export default SignIn;

// import styles from "./styles.module.css";

const SignIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { id, token } = useParams();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    const verifyEmail = async () => {
      console.log("Verifying email with ID:", id, "and token:", token);
      try {
        const url = `http://localhost:8080/api/users/${id}/verify/${token}`;
        const { data } = await axios.get(url);
        console.log("Verification success", data);
      } catch (error) {
        console.error("Error verifying email", error.response.data);
        setError(error.response.data.message);
      }
    };
    verifyEmail();
  }, [id, token]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      if (res.status === 201) {
        toast.success(res.message);
      } else if (res.status === 200) {
        toast.success(res.message);
        window.location = "/";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

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
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </div>
        <div className="sign_right">
          <h1>New Here?</h1>
          <Link to="/signup">
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
