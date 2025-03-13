"use client";

import { Button, Paper, Typography, LinearProgress, Stack } from "@mui/material";
import { Mic, Stop, NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useState } from "react";
import { PageContainer } from "../../common/PageContainer";
import { SPACING } from "@/src/theme";

export default function ReadingKaraoke() {
    const [isRecording, setIsRecording] = useState(false);
    const [progress, setProgress] = useState(30);

    return (
        <PageContainer>
            {/* Title Section */}
            <Stack spacing={1} sx={{ textAlign: "center", mb: SPACING.SECTION_GAP }}>
                <Typography variant="h4" sx={{ color: "text.primary" }}>
                    Reading Karaoke
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    The Hobbit - Chapter 1
                </Typography>
            </Stack>

            {/* Progress Section */}
            <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                    Progress: {progress}%
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </Stack>

            {/* Text Display Box */}
            <Paper elevation={3}>
                <Typography variant="body1" align="center">
                    "In a hole in the ground there lived a hobbit"
                </Typography>
            </Paper>

            {/* Feedback Box */}
            <Paper
                elevation={3}
                sx={{ minHeight: 150 }}
            >
                <Typography variant="subtitle1" color="text.secondary" align="center">
                    Feedback will appear here after recording
                </Typography>
            </Paper>

            {/* Navigation and Recording Buttons */}
            <Stack direction="row" spacing={SPACING.ELEMENT_GAP}>
                <Button
                    variant="outlined"
                    startIcon={<NavigateBefore />}
                    onClick={() => {/* Handle previous */}}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsRecording(!isRecording)}
                    startIcon={isRecording ? <Stop /> : <Mic />}
                    color={isRecording ? "error" : "primary"}
                    sx={{ px: 4 }}
                >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                </Button>
                <Button
                    variant="contained"
                    endIcon={<NavigateNext />}
                    onClick={() => {/* Handle next */}}
                >
                    Next
                </Button>
            </Stack>
        </PageContainer>
    );
}
