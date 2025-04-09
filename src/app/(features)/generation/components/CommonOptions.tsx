import { Stack, Typography, FormControl, FormLabel, Switch, Input, Box } from "@mui/joy";

import MobileFriendlySlider from "@/components/MobileFriendlySlider";

interface CommonOptionsProps {
    t: (key: string) => string;
    teleprompter: boolean;
    setTeleprompter: (value: boolean) => void;
    wordsPerMinute: number;
    setWordsPerMinute: (value: number) => void;
    feedbackStrictness: number;
    setFeedbackStrictness: (value: number) => void;
}

export default function CommonOptions({
    t,
    teleprompter,
    setTeleprompter,
    wordsPerMinute,
    setWordsPerMinute,
    feedbackStrictness,
    setFeedbackStrictness,
}: Readonly<CommonOptionsProps>) {
    return (
        <Stack spacing={2}>
            <Stack spacing={1}>
                <Typography level="h3">
                    {t("step2.optionsTitle")}
                </Typography>
                <Typography level="body-sm" color="warning">
                    {t("step2.experimentalWarning")}
                </Typography>
            </Stack>
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
            <FormControl>
                <FormLabel>{t("step2.feedbackStrictnessLabel")}</FormLabel>
                <MobileFriendlySlider
                    value={feedbackStrictness}
                    onChange={(e, newValue) => setFeedbackStrictness(newValue as number)}
                    min={0}
                    max={100}
                    step={1}
                    marks={[
                        { value: 0, label: t("step2.feedbackStrictnessMin") },
                        { value: 100, label: t("step2.feedbackStrictnessMax") },
                    ]}
                    valueLabelDisplay="auto"
                />
            </FormControl>
        </Stack>
    );
}
