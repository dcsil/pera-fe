import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
    interface TypographySystem {
        h5?: {
            fontSize?: string;
            fontWeight?: number;
            lineHeight?: number;
        };
    }

    interface PaletteColor {
        solidBg?: string;
        solidHoverBg?: string;
        solidColor?: string;
        solidActiveBg?: string;
    }

    interface Palette {
        secondary: {
            solidBg: string;
            solidColor: string;
            solidHoverBg: string;
            solidActiveBg: string;
        };
        neutral: {
            outlinedBg: string;
            outlinedHoverBg: string;
            outlinedActiveBg: string;
            outlinedBorder: string;
        };
        primary: PaletteColor & {
            solidBg: string;
            solidHoverBg: string;
            solidColor: string;
            solidActiveBg?: string;
            softHoverBg?: string;
        };
    }

    interface PaletteOptions {
        secondary?: {
            solidBg?: string;
            solidColor?: string;
            solidHoverBg?: string;
            solidActiveBg?: string;
        };
        neutral?: {
            outlinedBg?: string;
            outlinedHoverBg?: string;
            outlinedActiveBg?: string;
            outlinedBorder?: string;
        };
        primary?: {
            solidBg?: string;
            solidHoverBg?: string;
            solidColor?: string;
            solidActiveBg?: string;
        };
    }
}

const theme = extendTheme({
    typography: {
        h5: {
            fontSize: "0.875rem", // Smaller font size
            fontWeight: 600, // Bold text
            lineHeight: 1.5, // Adjusted line height
        },
    },
    colorSchemes: {
        light: {
            palette: {
                common: {
                    white: "#FFFFFF",
                },
                primary: {
                    solidBg: "#B71C1C", // Dark red
                    solidHoverBg: "#D32F2F", // Medium red
                    solidColor: "#FFFFFF", // White text on primary
                    solidActiveBg: "#F44336", // Light red
                },
                secondary: {
                    solidBg: "#FF5722", // Orange
                    solidHoverBg: "#FF7043", // Lighter orange
                    solidColor: "#FFFFFF", // White text on secondary
                    solidActiveBg: "#FF8A65", // Even lighter orange
                },
                success: {
                    solidBg: "#388E3C", // Green for success
                    solidHoverBg: "#4CAF50",
                    solidActiveBg: "#66BB6A",
                },
                neutral: {
                    outlinedBg: "#F5F5F5", // Light gray for neutral background
                    outlinedHoverBg: "#EEEEEE",
                    outlinedActiveBg: "#E0E0E0",
                    outlinedBorder: "rgba(0, 0, 0, 0.12)",
                },
                text: {
                    primary: "#212121", // Dark gray for primary text
                    secondary: "#757575", // Medium gray for secondary text
                },
                background: {
                    body: "#FAFAFA", // Light gray for body background
                    surface: "#FFFFFF", // White for surface elements
                },
                focusVisible: "rgba(255, 87, 34, 0.4)", // Orange focus ring
            },
        },
    },
    focus: {
        default: {
            outlineWidth: "3px",
        },
    },
    fontFamily: {
        body: "SF Pro Text, var(--gh-fontFamily-fallback)",
    },
    components: {
        JoyButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: "6px",
                    boxShadow: "0 1px 0 0 rgba(27, 31, 35, 0.04)",
                    transition: "80ms cubic-bezier(0.33, 1, 0.68, 1)",
                    transitionProperty: "color,background-color,box-shadow,border-color",
                    ...(ownerState.size === "md" && {
                        "fontWeight": 600,
                        "minHeight": "32px",
                        "fontSize": "14px",
                        "--Button-paddingInline": "1rem",
                    }),
                    ...(ownerState.color === "primary" && {
                        "&:hover": {
                            backgroundColor: "#D32F2F", // Match hover color
                        },
                    }),
                }),
            },
        },
    },
});

export default theme;
