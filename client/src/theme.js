import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#d81b60',
        },
        background: {
            default: '#e9eeed',
            alt: '#747071',
        },
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "white",
                    textDecoration: 'none',
                },
            },
        },
    },
})

export default theme;