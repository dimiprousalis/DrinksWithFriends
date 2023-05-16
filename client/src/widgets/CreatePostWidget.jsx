import * as React from "react";
import {
    Box,
    Button,
    TextField,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";

const api_base = "http://localhost:3001"

/* SCHEMAS */
const createPostSchema = yup.object().shape({
    title: yup.string().required("Required"),
    ingredient: yup.string().required("Required"),
    instruction: yup.string().required("Required"),
});


/* INITIAL VALUES */
const initialValues = {
    title: "",
    ingredient: "",
    instruction: "",
};

/* FORM */
const CreatePostWidget = () => {
    const token = useSelector((state) => state.token);

    /* POST LOGIC */
    const recipePost = async (values, onSubmitProps) => {
        const savedPostResponse = await fetch(`${api_base}/recipes/createRecipe`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(values),
            }
        );

        const savedPost = await savedPostResponse.json();

        onSubmitProps.resetForm();

        if (savedPost) {
            alert("Recipe Posted")
        }
    };


    /* HANDLER */
    const handleFormSubmit = async (values, onSubmitProps) => {
        await recipePost(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={createPostSchema}
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
                            <TextField
                                label="Title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                                error={
                                    Boolean(touched.title) && Boolean(errors.title)
                                }
                                helperText={touched.title && errors.title}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Ingredient"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ingredient}
                                name="ingredient"
                                error={
                                    Boolean(touched.ingredient) && Boolean(errors.ingredient)
                                }
                                helperText={touched.ingredient && errors.ingredient}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="instruction"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.instruction}
                                name="instruction"
                                error={
                                    Boolean(touched.instruction) && Boolean(errors.instruction)
                                }
                                helperText={touched.instruction && errors.instruction}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </>

                    </Box>
                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                            }}
                        >
                            Post Recipe
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};


export default CreatePostWidget;