"use client";

import { Button, Paper, Typography, LinearProgress, Stack } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PageContainer } from "../../common/PageContainer";
import { SPACING } from "@/theme";
import RecordButton from "@/components/RecordButton";
import { BACKEND } from "@/lib/urls";
import { Box } from "@mui/material";

interface FeedbackProps {
    accuracy: number;
    fluency: number;
    pronunciation: number;
}

function PopulatedFeedback({ accuracy, fluency, pronunciation }: FeedbackProps) {
    const t = useTranslations("readingKaraoke");
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <Box textAlign="center">
                <Typography variant="h6">
                    {accuracy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("accuracyScore")}
                </Typography>
            </Box>
            <Box textAlign="center">
                <Typography variant="h6">
                    {fluency}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("fluencyScore")}
                </Typography>
            </Box>
            <Box textAlign="center">
                <Typography variant="h6">
                    {pronunciation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {t("pronunciationScore")}
                </Typography>
            </Box>
        </Stack>
    );
}

export default function ReadingKaraoke() {
    const t = useTranslations("readingKaraoke");
    const progressStr = "30%";
    const progress = 30;

    const [feedback, setFeedback] = useState<FeedbackProps | undefined>(undefined);

    async function sendAudio(blob: Blob) {
        // TODO: Change this to the backend URL
        const baseUrl = BACKEND;
        const url = baseUrl + "/speech-processing/scripted-assessment/";
        const formData = new FormData();
        formData.append("audio", blob);
        formData.append("text", t("samplePlaceholder.sentence"));
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            // TODO: Do something
        }
        // parse response JSON
        const json = await response.json();
        setFeedback({
            accuracy: json.AccuracyScore,
            fluency: json.FluencyScore,
            pronunciation: json.PronunciationScore,
        });
    }

    let displayedFeedback;
    if (feedback) {
        displayedFeedback = <PopulatedFeedback {...feedback} />;
    }
    else {
        displayedFeedback = (
            <Typography variant="subtitle1" color="text.secondary" align="center">
                {t("feedback")}
            </Typography>
        );
    }

    return (
        <PageContainer>
            <Stack spacing={1} sx={{ textAlign: "center", mb: SPACING.SECTION_GAP }}>
                <Typography variant="h4" sx={{ color: "text.primary" }}>
                    {t("title")}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {t("samplePlaceholder.title")}
                </Typography>
            </Stack>

            <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography variant="body2" color="text.secondary">
                    {t("progress")}
                    {progressStr}
                </Typography>
                <LinearProgress variant="determinate" value={progress} />
            </Stack>

            <Paper elevation={3}>
                <Typography variant="body1" align="center">
                    {t("samplePlaceholder.sentence")}
                </Typography>
            </Paper>

            <Paper
                elevation={3}
                sx={{ minHeight: 150 }}
            >
                {displayedFeedback}
            </Paper>

            <Stack direction="row" spacing={SPACING.ELEMENT_GAP}>
                <Button
                    variant="outlined"
                    startIcon={<NavigateBefore />}
                    onClick={() => {}}
                >
                    {t("previous")}
                </Button>
                <RecordButton onBlobReady={sendAudio} />
                <Button
                    variant="contained"
                    endIcon={<NavigateNext />}
                    onClick={() => {}}
                >
                    {t("next")}
                </Button>
            </Stack>
        </PageContainer>
    );
}
