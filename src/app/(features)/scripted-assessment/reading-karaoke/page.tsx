"use client";

import { Button, Card, Typography, LinearProgress, Stack, IconButton, Box, Divider } from "@mui/joy";
import { NavigateNext, NavigateBefore, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PageContainer } from "../../common/PageContainer";
import { SPACING } from "@/theme";
import RecordButton from "@/components/RecordButton";
import { BACKEND } from "@/lib/urls";
import FeedbackDial from "@/components/FeedbackDial";

interface Word {
    Word: string;
    Offset: number;
    Duration: number;
    PronunciationAssessment?: {
        AccuracyScore: number;
        ErrorType: string;
    };
}

interface FeedbackProps {
    accuracy: number;
    fluency: number;
    pronunciation: number;
    mispronouncedWords: { word: string; error: string }[];
}

export default function ReadingKaraoke() {
    const t = useTranslations("readingKaraoke");
    const progress = 30;

    const [feedback, setFeedback] = useState<FeedbackProps | undefined>(undefined);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

    async function sendAudio(blob: Blob) {
        const url = `${BACKEND}/speech-processing/scripted-assessment/`;
        const formData = new FormData();
        formData.append("audio", blob);
        formData.append("text", t("samplePlaceholder.sentence"));

        let json;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                console.error("Failed to send audio");
                return;
            }
            json = await response.json();
        }
        catch (error) {
            console.error("Error fetching audio processing results:", error);
            return;
        }

        let parsedJsonResult;
        try {
            parsedJsonResult = JSON.parse(json.JsonResult);
        }
        catch (error) {
            console.error("Failed to parse JsonResult:", error);
            return;
        }

        const nBest = parsedJsonResult?.NBest;
        if (!nBest || nBest.length === 0) {
            console.error("No NBest results found in the response");
            return;
        }

        const mispronouncedWords = nBest[0].Words?.filter(
            (word: Word) => word.PronunciationAssessment?.ErrorType !== "None",
        ).map((word: Word) => ({
            word: word.Word,
            error: word.PronunciationAssessment?.ErrorType || "Unknown error",
        })) || [];

        setFeedback({
            accuracy: (json.AccuracyScore || 0) * 20,
            fluency: (json.FluencyScore || 0) * 20,
            pronunciation: (json.PronunciationScore || 0) * 20,
            mispronouncedWords,
        });
        setIsFeedbackVisible(true);
    }

    return (
        <PageContainer>
            <Stack
                spacing={1}
                sx={{
                    textAlign: "center",
                    mb: SPACING.SECTION_GAP,
                    mt: 6,
                }}
            >
                <Typography level="h2" sx={{ color: "text.primary" }}>
                    {t("title")}
                </Typography>
                <Typography level="body-md" sx={{ color: "text.secondary" }}>
                    {t("samplePlaceholder.title")}
                </Typography>
            </Stack>

            <Stack spacing={1} sx={{ width: "100%", maxWidth: "75%", mx: "auto", mb: 2 }}>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    {t("progress")}
                    {" "}
                    {progress}
                    {t("%")}
                </Typography>
                <LinearProgress
                    determinate
                    variant="solid"
                    value={progress}
                    sx={{
                        "height": "8px",
                        "borderRadius": 4,
                        "backgroundColor": "secondary.outlinedBg",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "primary.solidBg",
                        },
                        "&:focus-visible": {
                            outline: "none",
                        },
                    }}
                />
            </Stack>

            <Card
                variant="outlined"
                sx={{
                    padding: 2,
                    backgroundColor: "background.surface",
                    width: "75%",
                    mx: "auto",
                    mb: 2,
                }}
            >
                <Typography
                    level="h5"
                    sx={{
                        color: "text.primary",
                        textAlign: "left",
                        mb: 0,
                    }}
                >
                    {t("instructions")}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography
                    level="body-md"
                    sx={{
                        color: "text.primary",
                        textAlign: "center",
                    }}
                >
                    {t("samplePlaceholder.sentence")}
                </Typography>
            </Card>

            <Card
                variant="outlined"
                sx={{
                    padding: 3,
                    textAlign: "center",
                    backgroundColor: "background.surface",
                    width: "75%",
                    mx: "auto",
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography level="h4" sx={{ color: "text.primary" }}>
                        {t("feedbackTitle")}
                    </Typography>
                    <IconButton
                        onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
                        size="sm"
                        variant="plain"
                    >
                        {isFeedbackVisible ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Stack>
                {isFeedbackVisible && (
                    <Box sx={{ mt: 2 }}>
                        {feedback
                            ? (
                                    <Stack spacing={4} alignItems="center">
                                        <Stack
                                            direction={{ xs: "column", sm: "row" }}
                                            spacing={4}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <FeedbackDial label={t("accuracyScore")} value={feedback.accuracy} />
                                            <FeedbackDial label={t("fluencyScore")} value={feedback.fluency} />
                                            <FeedbackDial label={t("pronunciationScore")} value={feedback.pronunciation} />
                                        </Stack>
                                        <Box sx={{ mt: 4, textAlign: "left", width: "100%" }}>
                                            <Typography level="h4" sx={{ mb: 2 }}>
                                                {t("errorsTitle")}
                                            </Typography>
                                            {feedback.mispronouncedWords.length > 0
                                                ? (
                                                        feedback.mispronouncedWords.map(word => (
                                                            <Typography key={word.word} level="body-sm" sx={{ mb: 1 }}>
                                                                <strong>
                                                                    {word.word}
                                                                    {t(":")}
                                                                </strong>
                                                                {" "}
                                                                {word.error}
                                                            </Typography>
                                                        ))
                                                    )
                                                : (
                                                        <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                                                            {t("noErrors")}
                                                        </Typography>
                                                    )}
                                        </Box>
                                    </Stack>
                                )
                            : (
                                    <Typography level="body-sm" sx={{ color: "text.secondary", mt: 2 }}>
                                        {t("feedbackPlaceholder")}
                                    </Typography>
                                )}
                    </Box>
                )}
            </Card>

            <Stack
                direction="row"
                spacing={SPACING.ELEMENT_GAP}
                sx={{
                    justifyContent: "space-between",
                    width: "100%",
                    maxWidth: "75%",
                    mx: "auto",
                    mt: 4,
                    mb: 6,
                    flexWrap: "wrap",
                }}
            >
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
                        "flex": "1 1 auto",
                        "minWidth": "80px",
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
                        "flex": "1 1 auto",
                        "minWidth": "80px",
                    }}
                >
                    {t("next")}
                </Button>
            </Stack>
        </PageContainer>
    );
}
