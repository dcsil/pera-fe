"use client";

import { Box, Button, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

interface OverviewProps {
    sentences: Array<{ text: string }>;
    currentSentenceIndex: number;
    onSelectSentence: (index: number) => void;
}

export default function Overview({
    sentences,
    currentSentenceIndex,
    onSelectSentence,
}: Readonly<OverviewProps>) {
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
        </Box>
    );
}
