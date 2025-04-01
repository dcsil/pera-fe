"use client";

import { Box, Typography, CircularProgress } from "@mui/joy";
import { useTranslations } from "next-intl";

interface FeedbackDialProps {
    label: string;
    value: number;
}

export default function FeedbackDial({ label, value }: FeedbackDialProps) {
    const t = useTranslations("readingKaraoke");
    const getColor = (value: number) => {
        if (value < 25) return "#FF0000"; // Red
        if (value < 50) return "#FFA500"; // Orange
        if (value < 75) return "#FFD700"; // Yellow
        return "#00FF00"; // Green
    };

    return (
        <Box textAlign="center" sx={{ position: "relative", width: "120px", height: "120px" }}>
            {/* Background Circle */}
            <CircularProgress
                determinate
                value={100}
                size="lg"
                sx={{
                    "--CircularProgress-size": "120px",
                    "--CircularProgress-trackColor": "#E0E0E0", // Light gray background
                    "--CircularProgress-progressColor": "transparent", // No progress color for the background
                }}
            />
            {/* Foreground Circle */}
            <CircularProgress
                determinate
                value={value}
                size="lg"
                sx={{
                    "--CircularProgress-size": "120px",
                    "--CircularProgress-trackColor": "transparent", // Transparent track
                    "--CircularProgress-progressColor": getColor(value), // Dynamic color
                    "--CircularProgress-linecap": "round", // Smooth ends
                    "zIndex": 1,
                    "position": "absolute",
                    "top": 0,
                    "left": 0,
                }}
            />
            {/* Value and Label */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
                <Typography level="h4" sx={{ color: "text.primary", fontWeight: "bold" }}>
                    {value}
                    {t("%")}
                </Typography>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    {label}
                </Typography>
            </Box>
        </Box>
    );
}
