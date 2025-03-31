"use client";

import { Button, Card, Typography, LinearProgress, Stack, Box } from "@mui/joy";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PageContainer } from "../../common/PageContainer";
import { SPACING } from "@/theme";
import RecordButton from "@/components/RecordButton";
import { BACKEND } from "@/lib/urls";

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
                <Typography level="h4">{accuracy}</Typography>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    {t("accuracyScore")}
                </Typography>
            </Box>
            <Box textAlign="center">
                <Typography level="h4">{fluency}</Typography>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    {t("fluencyScore")}
                </Typography>
            </Box>
            <Box textAlign="center">
                <Typography level="h4">{pronunciation}</Typography>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
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
        const url = `${BACKEND}/speech-processing/scripted-assessment/`;
        const formData = new FormData();
        formData.append("audio", blob);
        formData.append("text", t("samplePlaceholder.sentence"));
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            console.error("Failed to send audio");
            return;
        }
        const json = await response.json();
        setFeedback({
            accuracy: json.AccuracyScore,
            fluency: json.FluencyScore,
            pronunciation: json.PronunciationScore,
        });
    }

    const displayedFeedback = feedback
        ? (<PopulatedFeedback {...feedback} />)
        : (
                <Typography level="body-sm" sx={{ color: "text.secondary", textAlign: "center" }}>
                    {t("feedback")}
                </Typography>
            );

    return (
        <PageContainer>
            {/* Title Section */}
            <Stack spacing={1} sx={{ textAlign: "center", mb: SPACING.SECTION_GAP }}>
                <Typography level="h2" sx={{ color: "text.primary" }}>
                    {t("title")}
                </Typography>
                <Typography level="body-md" sx={{ color: "text.secondary" }}>
                    {t("samplePlaceholder.title")}
                </Typography>
            </Stack>

            {/* Progress Section */}
            <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    {t("progress")}
                    {" "}
                    {progressStr}
                </Typography>
                <LinearProgress
                    determinate
                    value={progress}
                    sx={{
                        "height": 8,
                        "borderRadius": 4,
                        "backgroundColor": "neutral.outlinedBg",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "primary.solidBg",
                        },
                    }}
                />
            </Stack>

            {/* Sentence Section */}
            <Card
                variant="outlined"
                sx={{
                    padding: 3,
                    textAlign: "center",
                    backgroundColor: "background.surface",
                }}
            >
                <Typography level="body-md" sx={{ color: "text.primary" }}>
                    {t("samplePlaceholder.sentence")}
                </Typography>
            </Card>

            {/* Feedback Section */}
            <Card
                variant="outlined"
                sx={{
                    minHeight: 150,
                    padding: 3,
                    textAlign: "center",
                    backgroundColor: "background.surface",
                }}
            >
                {displayedFeedback}
            </Card>

            {/* Action Buttons */}
            <Stack direction="row" spacing={SPACING.ELEMENT_GAP} sx={{ justifyContent: "space-between" }}>
                <Button
                    variant="solid"
                    startDecorator={<NavigateBefore />}
                    onClick={() => {}}
                    sx={{
                        "backgroundColor": "primary.solidBg",
                        "color": "primary.solidColor",
                        "&:hover": {
                            backgroundColor: "primary.solidHoverBg",
                        },
                    }}
                >
                    {t("previous")}
                </Button>
                <RecordButton onBlobReady={sendAudio} />
                <Button
                    variant="solid"
                    endDecorator={<NavigateNext />}
                    onClick={() => {}}
                    sx={{
                        "backgroundColor": "primary.solidBg",
                        "color": "primary.solidColor",
                        "&:hover": {
                            backgroundColor: "primary.solidHoverBg",
                        },
                    }}
                >
                    {t("next")}
                </Button>
            </Stack>
        </PageContainer>
    );
}
