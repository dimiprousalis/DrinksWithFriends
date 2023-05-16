import * as React from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
const api_base = "http://localhost:3001"



/* SCHEMAS */
const signupSchema = yup.object().shape({
    userName: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});


/* INITIAL VALUES */
const initialValuesSignup = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
};



/* FORM */
const SignupForm = () => {
    const navigate = useNavigate();


    /* SIGNUP LOGIC */
    const signup = async (values, onSubmitProps) => {

        //POST request to server with data from form and store response
        const savedUserResponse = await fetch(`${api_base}/signup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }


        );


        //Save user info and reset form
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
        //Switch to login page
        if (savedUser) {
            navigate("/login");
        }
    };


    /* HANDLER */
    const handleFormSubmit = async (values, onSubmitProps) => {
        await signup(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesSignup}
            validationSchema={signupSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>

                    <Box
                        gap="20px"
                        sx={{
                            marginTop: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <>
                            <Typography variant="h3">Sign up</Typography>
                            <TextField
                                label="Username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.userName}
                                name="userName"
                                error={
                                    Boolean(touched.userName) && Boolean(errors.userName)
                                }
                                helperText={touched.userName && errors.userName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={
                                    Boolean(touched.email) && Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                type="password"
                                error={
                                    Boolean(touched.password) && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Re-enter Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                type="password"
                                error={
                                    Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)
                                }
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Typography variant="h6">
                                Already a user? <Link to="/login"> Login here</Link>
                            </Typography>
                        </>
                    </Box>

                </form>
            )}
        </Formik>
    );
};

export default SignupForm;