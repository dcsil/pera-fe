import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
            dark: "#1976d2",
            light: "#64b5f6",
            contrastText: "#ffffff",
        },
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        text: {
            primary: "#000000",
            secondary: "rgba(0, 0, 0, 0.6)",
        },
    },
    spacing: 8,
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingTop: "64px",
                    paddingBottom: "64px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: "32px",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "4px",
                },
                contained: {
                    "&:hover": {
                        backgroundColor: "#1976d2",
                    },
                },
            },
        },
    },
});
