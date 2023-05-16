import {
    Button,
    Box,
    Typography
} from "@mui/material";
import { Link } from "react-router-dom";


export const Index = () => {
    return (
        <>
            <Typography variant="h3">Welcome to Drinks with Friends</Typography>
            <Box
                gap="20px"
                sx={{
                    marginTop: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        type="button"
                    >
                        Login
                    </Button>
                </Link>

                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        type="button"
                    >
                        Sign Up
                    </Button>
                </Link>
            </Box>
        </>
    )
};