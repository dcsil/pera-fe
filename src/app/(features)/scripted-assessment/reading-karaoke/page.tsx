"use client";

import { Button, Card, Typography, LinearProgress, Stack, IconButton, Box, Divider } from "@mui/joy";
import { NavigateNext, NavigateBefore, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { PageContainer } from "../../common/PageContainer";
import RecordButton from "@/components/RecordButton";
import { BACKEND } from "@/lib/urls";
import FeedbackDial from "@/components/FeedbackDial";
import { FALLBACK_PASSAGE } from "@/constants/fallbackPassage";
import { fetchAuth } from "@/lib/auth";
import OverviewPage from "./OverviewPage";

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

interface Passage {
    passage_id: number;
    title: string;
    language: string;
    difficulty: string;
    created_at: string;
    sentences: Array<{
        sentence_id: number;
        passage_id: number;
        text: string;
        completion_status: boolean;
        created_at: string;
    }>;
}

export default function ReadingKaraoke() {
    const t = useTranslations("readingKaraoke");

    const [feedback, setFeedback] = useState<FeedbackProps | undefined>(undefined);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [passage, setPassage] = useState<Passage | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [isOverviewVisible, setIsOverviewVisible] = useState(false);

    useEffect(() => {
        // This will only run on the client side
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("passage_id");

        // The "0" is meant to be a temporary measure. We did this in other places too.
        handlePassageIdChange(id ?? "0");
        // Can be replaced by useEffectEvent once it becomes stable
    }, []);

    async function handlePassageIdChange(id: string) {
        try {
            const response = await fetchAuth(`${BACKEND}/texts/user-passages/`);
            if (!response?.ok) {
                throw new Error("Failed to fetch passage");
            }
            const data: Passage[] = await response.json();
            console.log(data);
            const foundPassage = data.find((item: Passage) => item.passage_id === Number(id));
            if (!foundPassage) {
                throw new Error("Passage not found, passageId: " + id);
            }
            setPassage(foundPassage);
        }
        catch (error) {
            console.error("Error fetching passage:", error);
            setPassage(FALLBACK_PASSAGE);
        }
        finally {
            setLoading(false);
        }
    };

    const progress = passage ? ((currentSentenceIndex + 1) / passage.sentences.length) * 100 : 0;

    const handleNext = () => {
        if (passage && currentSentenceIndex < passage.sentences.length - 1) {
            setCurrentSentenceIndex(currentSentenceIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentSentenceIndex > 0) {
            setCurrentSentenceIndex(currentSentenceIndex - 1);
        }
    };

    async function sendAudio(blob: Blob) {
        const url = `${BACKEND}/speech-processing/scripted-assessment/`;
        const formData = new FormData();
        formData.append("audio", blob);
        formData.append("text", passage?.sentences[currentSentenceIndex]?.text || "");

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

    if (loading) {
        return (
            <PageContainer>
                <Typography level="h4" textAlign="center">
                    {t("loading")}
                </Typography>
            </PageContainer>
        );
    }

    if (!passage) {
        return (
            <PageContainer>
                <Typography level="h4" textAlign="center" color="danger">
                    {t("error.noPassage")}
                </Typography>
            </PageContainer>
        );
    }

    if (isOverviewVisible) {
        return (
            <OverviewPage
                passageTitle={passage.title}
                sentences={passage.sentences}
                currentSentenceIndex={currentSentenceIndex}
                progress={progress}
                onSelectSentence={(index) => {
                    setCurrentSentenceIndex(index);
                    setIsOverviewVisible(false);
                }}
                onBack={() => setIsOverviewVisible(false)}
            />
        );
    }

    return (
        <PageContainer>
            <Stack
                spacing={1}
                sx={{
                    textAlign: "center",
                    mb: 4,
                    mt: 6,
                }}
            >
                <Typography level="h2" sx={{ color: "text.primary" }}>
                    {t("title")}
                </Typography>
                <Typography level="body-md" sx={{ color: "text.secondary" }}>
                    {passage.title}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", maxWidth: "75%", mx: "auto", mb: 2 }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                        {t("progress", { current: currentSentenceIndex + 1, total: passage.sentences.length })}
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
                </Box>
                <Button
                    variant="plain"
                    size="sm"
                    onClick={() => setIsOverviewVisible(true)}
                    sx={{
                        "minWidth": "auto",
                        "padding": "4px 8px",
                        "fontSize": "0.875rem",
                        "fontWeight": "bold",
                        "backgroundColor": "primary.solidBg",
                        "color": "primary.solidColor",
                        "&:hover": {
                            backgroundColor: "primary.solidHoverBg",
                        },
                    }}
                >
                    {t("overview.viewAllSentences")}
                </Button>
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
                    {passage.sentences[currentSentenceIndex]?.text}
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
                spacing={2}
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
                    onClick={handlePrevious}
                    disabled={currentSentenceIndex === 0}
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
                    onClick={handleNext}
                    disabled={currentSentenceIndex === passage.sentences.length - 1}
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
