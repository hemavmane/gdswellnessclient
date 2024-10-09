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
import "./Style/SignUp.css"
const SignUp = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const [msg, setMsg] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message)
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
						<button type="submit" className="green_btn">
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
