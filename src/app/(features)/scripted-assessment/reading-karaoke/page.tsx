"use client";

import { Button, Card, Typography, LinearProgress, Stack } from "@mui/joy";
import { Mic, Stop, NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useState } from "react";
import { PageContainer } from "../../common/PageContainer";
import { SPACING } from "@/theme";
import { useTranslations } from "next-intl";

export default function ReadingKaraoke() {
    const [isRecording, setIsRecording] = useState(false);
    const t = useTranslations("readingKaraoke");
    const progressStr = "30%";
    const progress = 30;

    return (
        <PageContainer>
            <Stack spacing={1} sx={{ textAlign: "center", mb: SPACING.SECTION_GAP }}>
                <Typography level="h2" sx={{ color: "text.primary" }}>
                    {t("title")}
                </Typography>
                <Typography level="body-md" color="neutral">
                    {t("samplePlaceholder.title")}
                </Typography>
            </Stack>

            <Stack spacing={1} sx={{ width: "100%" }}>
                <Typography level="body-sm" color="neutral">
                    {t("progress")}
                    {progressStr}
                </Typography>
                <LinearProgress
                    determinate
                    value={progress}
                    sx={{ height: 8, borderRadius: 4 }}
                />
            </Stack>

            <Card variant="outlined">
                <Typography level="body-md" textAlign="center">
                    {t("samplePlaceholder.sentence")}
                </Typography>
            </Card>

            <Card
                variant="outlined"
                sx={{ minHeight: 150 }}
            >
                <Typography level="body-sm" color="neutral" textAlign="center">
                    {t("feedback")}
                </Typography>
            </Card>

            <Stack direction="row" spacing={SPACING.ELEMENT_GAP}>
                <Button
                    variant="solid"
                    startDecorator={<NavigateBefore />}
                    onClick={() => {}}
                >
                    {t("previous")}
                </Button>
                <Button
                    variant="solid"
                    size="lg"
                    onClick={() => setIsRecording(!isRecording)}
                    startDecorator={isRecording ? <Stop /> : <Mic />}
                    color={isRecording ? "warning" : "primary"}
                    sx={{ px: 4 }}
                >
                    {isRecording ? t("stopRecording") : t("startRecording")}
                </Button>
                <Button
                    variant="solid"
                    endDecorator={<NavigateNext />}
                    onClick={() => {}}
                >
                    {t("next")}
                </Button>
            </Stack>
        </PageContainer>
    );
}
