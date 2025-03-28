"use client";

import { Button, Paper, Typography, LinearProgress, Stack } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { PageContainer } from "../../common/PageContainer";
import { SPACING } from "@/theme";
import RecordButton from "@/components/RecordButton";

export default function ReadingKaraoke() {
    const t = useTranslations("readingKaraoke");
    const progressStr = "30%";
    const progress = 30;

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
                <Typography variant="subtitle1" color="text.secondary" align="center">
                    {t("feedback")}
                </Typography>
            </Paper>

            <Stack direction="row" spacing={SPACING.ELEMENT_GAP}>
                <Button
                    variant="outlined"
                    startIcon={<NavigateBefore />}
                    onClick={() => {}}
                >
                    {t("previous")}
                </Button>
                <RecordButton />
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
