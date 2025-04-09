"use client";

import { Box, Button, Typography, Card, Stack } from "@mui/joy";
import { useTranslations } from "next-intl";

interface ReviewGeneratedTextProps {
    generatedText: string;
    onAddToReadingKaraoke: () => void;
    onRetry: () => void;
}

export default function ReviewGeneratedText({
    generatedText,
    onAddToReadingKaraoke,
    onRetry,
}: Readonly<ReviewGeneratedTextProps>) {
    const t = useTranslations("get-started");

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
            <Typography level="h4" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
                {t("review.title")}
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    width: "100%",
                    p: 3,
                    mb: 4,
                    backgroundColor: "background.surface",
                }}
            >
                <Typography level="body-md" sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}>
                    {generatedText}
                </Typography>
            </Card>
            <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={onAddToReadingKaraoke}
                    sx={{
                        "backgroundColor": "primary.solidBg",
                        "color": "primary.solidColor",
                        "&:hover": {
                            backgroundColor: "primary.solidHoverBg",
                        },
                    }}
                >
                    {t("review.addToReadingKaraoke")}
                </Button>
                <Button
                    variant="plain"
                    onClick={onRetry}
                    sx={{
                        "backgroundColor": "neutral.outlinedBg",
                        "color": "text.primary",
                        "&:hover": {
                            backgroundColor: "neutral.outlinedHoverBg",
                        },
                    }}
                >
                    {t("review.retry")}
                </Button>
            </Stack>
        </Box>
    );
}
