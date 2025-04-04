"use client";

import { Button, Box, Typography, Stack, Card, FormControl, FormLabel, Select, Option, Switch, Input, Slider, Textarea } from "@mui/joy";
import { useState } from "react";

interface ImportSectionProps {
    t: (key: string) => string;
    fileType: string;
    setFileType: (value: string) => void;
    teleprompter: boolean;
    setTeleprompter: (value: boolean) => void;
    wordsPerMinute: number;
    setWordsPerMinute: (value: number) => void;
    feedbackStrictness: number;
    setFeedbackStrictness: (value: number) => void;
    onBack: () => void;
    onStart: () => void;
}

export default function ImportSection({
    t,
    fileType,
    setFileType,
    teleprompter,
    setTeleprompter,
    wordsPerMinute,
    setWordsPerMinute,
    feedbackStrictness,
    setFeedbackStrictness,
    onBack,
    onStart,
}: ImportSectionProps) {
    const [pastedText, setPastedText] = useState(""); // State for pasted text

    return (
        <Stack spacing={4} alignItems="center" sx={{ width: "100%", maxWidth: 800, padding: { xs: 2, md: 4 } }}>
            <Typography level="h4" fontWeight="lg" textAlign="center">
                {t("step2.importTitle")}
            </Typography>
            <Card variant="outlined" sx={{ width: "100%", padding: { xs: 2, md: 4 } }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    {/* Import Section */}
                    <Box sx={{ flex: 1 }}>
                        <FormControl>
                            <FormLabel>{t("step2.fileTypeLabel")}</FormLabel>
                            <Select
                                value={fileType}
                                onChange={(e, newValue) => setFileType(newValue || "text file")}
                            >
                                <Option value="text file">{t("step2.fileTypeOptions.textFile")}</Option>
                                <Option value="pdf">{t("step2.fileTypeOptions.pdf")}</Option>
                                <Option value="docx">{t("step2.fileTypeOptions.docx")}</Option>
                                <Option value="paste text">{t("step2.fileTypeOptions.pasteText")}</Option>
                            </Select>
                        </FormControl>
                        {fileType === "paste text"
                            ? (
                                    <Box sx={{ marginTop: 2 }}>
                                        <FormLabel>{t("step2.pasteTextLabel")}</FormLabel>
                                        <Textarea
                                            minRows={4}
                                            placeholder={t("step2.pasteTextPlaceholder")}
                                            value={pastedText}
                                            onChange={e => setPastedText(e.target.value)}
                                            sx={{ width: "100%" }}
                                        />
                                    </Box>
                                )
                            : (
                                    <Box
                                        sx={{
                                            border: "1px dashed",
                                            borderColor: "neutral.outlinedBorder",
                                            borderRadius: "md",
                                            padding: { xs: 2, md: 4 },
                                            textAlign: "center",
                                            marginTop: 2,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography level="body-md" sx={{ color: "text.secondary" }}>
                                            {t("step2.dragDropText")}
                                        </Typography>
                                    </Box>
                                )}
                    </Box>

                    {/* Options Section */}
                    <Box sx={{ flex: 1 }}>
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
                            <FormControl>
                                <FormLabel sx={{ marginBottom: 1 }}>{t("step2.feedbackStrictnessLabel")}</FormLabel>
                                <Slider
                                    value={feedbackStrictness}
                                    onChange={(e, newValue) => setFeedbackStrictness(newValue as number)}
                                    min={0}
                                    max={100}
                                    step={1}
                                    valueLabelDisplay="auto"
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography level="body-md">{t("step2.feedbackStrictnessMin")}</Typography>
                                    <Typography level="body-md">{t("step2.feedbackStrictnessMax")}</Typography>
                                </Box>
                            </FormControl>
                        </Stack>
                    </Box>
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
