import * as React from "react";
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { setLogin } from "state/index";
import { useDispatch } from "react-redux";
const api_base = "http://localhost:3001"

/* SCHEMAS */
const loginSchema = yup.object().shape({
    // email: yup.string().email("invalid email").required("required"),
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
});

/* INITIAL VALUES */
const initialValuesLogin = {
    userName: "",
    password: "",
};

/* FORM */
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* LOGIN LOGIC */
    const login = async (values, onSubmitProps) => {

        const loggedInResponse = await fetch(`${api_base}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        //Store JSON response, reset the form, dispatch to Redux store with user info & token then navigate home.
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    };

    /* HANDLER */
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);

    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
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
                            <Typography variant="h3">Welcome back</Typography>
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
                                sx={{ gridColumn: "span 4" }}
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
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Typography variant="h6">
                                New user? <Link to="/signup"> Sign up here</Link>
                            </Typography>
                        </>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;