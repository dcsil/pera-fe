"use client";

import { Button, Box, Typography, Stack, Card, FormControl, FormLabel, Slider, Textarea, Switch, Input } from "@mui/joy";
import { sendGenerateData, getLanguageFromCookies } from "@/lib/api";
import { useState } from "react";

interface GenerateSectionProps {
    t: (key: string) => string;
    description: string;
    setDescription: (value: string) => void;
    difficulty: number;
    setDifficulty: (value: number) => void;
    teleprompter: boolean;
    setTeleprompter: (value: boolean) => void;
    wordsPerMinute: number;
    setWordsPerMinute: (value: number) => void;
    feedbackStrictness: number;
    setFeedbackStrictness: (value: number) => void;
    onBack: () => void;
    onStart: () => void;
}

export default function GenerateSection({
    t,
    description,
    setDescription,
    difficulty,
    setDifficulty,
    teleprompter,
    setTeleprompter,
    wordsPerMinute,
    setWordsPerMinute,
    feedbackStrictness,
    setFeedbackStrictness,
    onBack,
    onStart,
}: Readonly<GenerateSectionProps>) {
    const [loading, setLoading] = useState(false);

    const handleStart = async () => {
        setLoading(true);
        try {
            const payload = {
                text: description,
                title: "Generated Title",
                language: getLanguageFromCookies(),
                difficulty: difficulty.toString(),
                exercise_mode: "RK",
                content_mode: "generate",
            };
            await sendGenerateData(payload);
            onStart();
        }
        catch (error) {
            console.error("Error sending generate data:", error);
            onStart();
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Stack spacing={4} alignItems="center" sx={{ width: "100%", maxWidth: 800, padding: { xs: 2, md: 4 } }}>
            <Typography level="h4" fontWeight="lg" textAlign="center">
                {t("step2.generateTitle")}
            </Typography>
            <Card variant="outlined" sx={{ width: "100%", padding: { xs: 2, md: 4 } }}>
                <Stack spacing={4}>
                    <Box>
                        <FormLabel>{t("step2.describeContentLabel")}</FormLabel>
                        <Textarea
                            minRows={4}
                            placeholder={t("step2.describeContentPlaceholder")}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            sx={{ width: "100%", marginTop: 2 }}
                        />
                    </Box>
                    <Box>
                        <Typography level="body-md" fontWeight="lg" sx={{ marginBottom: 2 }}>
                            {t("step2.optionsTitle")}
                        </Typography>
                        <Stack spacing={2}>
                            <FormControl orientation="horizontal" sx={{ justifyContent: "space-between" }}>
                                <FormLabel>{t("step2.teleprompterLabel")}</FormLabel>
                                <Switch
                                    checked={teleprompter}
                                    onChange={e => setTeleprompter(e.target.checked)}
                                />
                            </FormControl>
                            <FormControl orientation="horizontal" sx={{ justifyContent: "space-between" }}>
                                <FormLabel>{t("step2.wordsPerMinuteLabel")}</FormLabel>
                                <Input
                                    type="number"
                                    value={wordsPerMinute}
                                    onChange={e => setWordsPerMinute(Number(e.target.value))}
                                    sx={{ width: 80 }}
                                />
                            </FormControl>
                            <FormControl sx={{ marginBottom: 3 }}>
                                <FormLabel sx={{ marginBottom: 1 }}>{t("step2.feedbackStrictnessLabel")}</FormLabel>
                                <Slider
                                    value={feedbackStrictness}
                                    onChange={(e, newValue) => setFeedbackStrictness(newValue as number)}
                                    min={0}
                                    max={100}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    sx={{ marginTop: 1 }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                                    <Typography level="body-md">{t("step2.feedbackStrictnessMin")}</Typography>
                                    <Typography level="body-md">{t("step2.feedbackStrictnessMax")}</Typography>
                                </Box>
                            </FormControl>
                            <Box sx={{ marginTop: 3 }}>
                                <FormLabel sx={{ marginBottom: 1 }}>{t("step2.difficultyLabel")}</FormLabel>
                                <Slider
                                    value={difficulty}
                                    onChange={(e, newValue) => setDifficulty(newValue as number)}
                                    min={1}
                                    max={10}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    sx={{ marginTop: 1 }}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                                    <Typography level="body-md">{t("step2.difficultyEasy")}</Typography>
                                    <Typography level="body-md">{t("step2.difficultyHard")}</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ marginTop: 4 }}>
                    <Button variant="plain" onClick={onBack}>
                        {t("step2.backButton")}
                    </Button>
                    <Button variant="solid" onClick={handleStart} loading={loading}>
                        {t("step2.startButton")}
                    </Button>
                </Stack>
            </Card>
        </Stack>
    );
}
