"use client";

import { Box, Button, Typography, LinearProgress, Stack } from "@mui/joy";
import { useTranslations } from "next-intl";

interface OverviewPageProps {
    passageTitle: string;
    sentences: Array<{ text: string }>;
    currentSentenceIndex: number;
    progress: number;
    onSelectSentence: (index: number) => void;
    onBack: () => void;
}

export default function OverviewPage({
    passageTitle,
    sentences,
    currentSentenceIndex,
    progress,
    onSelectSentence,
    onBack,
}: Readonly<OverviewPageProps>) {
    const t = useTranslations("readingKaraoke");

    return (
        <Box
            sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: "800px",
                mx: "auto",
            }}
        >
            {/* Title and Progress Bar */}
            <Typography level="h2" sx={{ color: "text.primary" }}>
                {t("title")}
            </Typography>
            <Typography level="body-md" sx={{ color: "text.secondary" }}>
                {passageTitle}
            </Typography>
            <Stack spacing={1} sx={{ width: "100%", mb: 4 }}>
                <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                    {t("progress", { current: currentSentenceIndex + 1, total: sentences.length })}
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

            {/* Sentence List */}
            <Typography level="h5" sx={{ color: "text.primary", mb: 2 }}>
                {t("overview.selectSentence")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "100%",
                }}
            >
                {sentences.map((sentence, index) => (
                    <Button
                        key={index}
                        variant={index === currentSentenceIndex ? "solid" : "plain"}
                        color={index === currentSentenceIndex ? "primary" : "neutral"}
                        onClick={() => onSelectSentence(index)}
                        sx={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            whiteSpace: "normal",
                            fontWeight: index === currentSentenceIndex ? "bold" : "normal",
                        }}
                    >
                        {sentence.text}
                    </Button>
                ))}
            </Box>

            {/* Back Button */}
            <Button
                variant="plain"
                onClick={onBack}
                sx={{
                    "mt": 4,
                    "alignSelf": "center",
                    "backgroundColor": "primary.solidBg",
                    "color": "primary.solidColor",
                    "&:hover": {
                        backgroundColor: "primary.solidHoverBg",
                    },
                }}
            >
                {t("overview.backButton")}
            </Button>
        </Box>
    );
}
