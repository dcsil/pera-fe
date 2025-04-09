"use client";

import { Button, Card, FormControl, FormLabel, Stack, Textarea, Typography } from "@mui/joy";
import CommonOptions from "./CommonOptions";
import MobileFriendlySlider from "@/components/MobileFriendlySlider";

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
}: GenerateSectionProps) {
    return (
        <Stack spacing={4} alignItems="center" sx={{ width: "100%", maxWidth: 800, padding: { xs: 2, md: 4 } }}>
            <Typography level="h4" fontWeight="lg" textAlign="center">
                {t("step2.generateTitle")}
            </Typography>
            <Card variant="outlined" sx={{ width: "100%", padding: { xs: 2, md: 4 } }}>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <FormLabel>{t("step2.describeContentLabel")}</FormLabel>
                        <Textarea
                            minRows={4}
                            placeholder={t("step2.describeContentPlaceholder")}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            sx={{ width: "100%", marginTop: 2 }}
                        />
                        <FormControl>
                            <FormLabel>{t("step2.difficultyLabel")}</FormLabel>
                            <MobileFriendlySlider
                                value={difficulty}
                                onChange={(e, newValue) => setDifficulty(newValue as number)}
                                min={1}
                                max={10}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={[
                                    { value: 1, label: t("step2.difficultyEasy") },
                                    { value: 10, label: t("step2.difficultyHard") },
                                ]}
                            />
                        </FormControl>
                    </Stack>
                    <CommonOptions
                        t={t}
                        teleprompter={teleprompter}
                        setTeleprompter={setTeleprompter}
                        wordsPerMinute={wordsPerMinute}
                        setWordsPerMinute={setWordsPerMinute}
                        feedbackStrictness={feedbackStrictness}
                        setFeedbackStrictness={setFeedbackStrictness}
                    />
                </Stack>

                <Stack direction="row" justifyContent="space-between" sx={{ marginTop: 4 }}>
                    <Button variant="plain" onClick={onBack}>
                        {t("step2.backButton")}
                    </Button>
                    <Button variant="solid" onClick={onStart}>
                        {t("step2.startButton")}
                    </Button>
                </Stack>
            </Card>
        </Stack>
    );
}
