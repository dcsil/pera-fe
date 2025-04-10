"use client";

import { Box } from "@mui/joy";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Step1 from "./components/Step1";
import ImportSection from "./components/ImportSection";
import GenerateSection from "./components/GenerateSection";
import ReviewGeneratedText from "./components/ReviewGeneratedText";
import { sendImportData, getLanguageFromCookies } from "@/lib/api";
import { fetchAuth } from "@/lib/auth";
import { BACKEND } from "@/lib/urls";

export default function Generation() {
    const router = useRouter();
    const params = useSearchParams();
    const t = useTranslations("get-started");
    const mode = params?.get("mode") || null;
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState<"import" | "generate" | "history" | null>(null);
    const [fileType, setFileType] = useState("paste text");
    const [teleprompter, setTeleprompter] = useState(false);
    const [wordsPerMinute, setWordsPerMinute] = useState(120);
    const [feedbackStrictness, setFeedbackStrictness] = useState(50);
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(5);
    const [generatedText, setGeneratedText] = useState<string>("");
    const [title, setTitle] = useState<string>("Generated Title");

    const handleOptionSelect = (option: "import" | "generate" | "history") => {
        setSelectedOption(option);
        setStep(2);
    };

    const handleGenerate = async () => {
        const payload = {
            description: description,
            difficulty: difficulty,
        };
        setTitle(description);
        try {
            const response = await fetchAuth(`${BACKEND}/texts/generate-passage/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response?.ok) {
                throw new Error("Failed to send import data");
            }
            const responseData = await response.json();
            console.log(responseData);
            setGeneratedText(responseData);
        }
        catch (error) {
            console.error("Error generating text:", error);
            const simulatedText = "This is the generated text based on your input.";
            setGeneratedText(simulatedText);
        }
        setStep(3);
    };

    const handleRetry = () => {
        setStep(2);
    };

    const handleAddToReadingKaraoke = async () => {
        try {
            const payload = {
                text: generatedText || "Generated content",
                title: title || "Generated Title",
                language: getLanguageFromCookies(),
                difficulty: "custom",
                exercise_mode: "RK",
                content_mode: "generate",
            };
            const response = await sendImportData(payload);
            if (response?.status !== 200) {
                throw new Error("Failed to send import data");
            }
            const responseData = await response.json();

            if (responseData.passage_id) {
                router.push(`/scripted-assessment/reading-karaoke?passage_id=${responseData.passage_id}`);
            }
            else {
                console.error("Invalid response from sendImportData:", response);
            }
        }
        catch (error) {
            console.error("Error sending import data:", error);
        }
    };

    const renderStep2 = () => {
        if (selectedOption === "import") {
            return (
                <ImportSection
                    t={t}
                    fileType={fileType}
                    setFileType={setFileType}
                    teleprompter={teleprompter}
                    setTeleprompter={setTeleprompter}
                    wordsPerMinute={wordsPerMinute}
                    setWordsPerMinute={setWordsPerMinute}
                    feedbackStrictness={feedbackStrictness}
                    setFeedbackStrictness={setFeedbackStrictness}
                    onBack={() => setStep(1)}
                    onStart={(passage_id: number) => router.push("/scripted-assessment/reading-karaoke?passage_id=" + passage_id)}
                />
            );
        }
        else if (selectedOption === "generate") {
            return (
                <GenerateSection
                    t={t}
                    description={description}
                    setDescription={setDescription}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    teleprompter={teleprompter}
                    setTeleprompter={setTeleprompter}
                    wordsPerMinute={wordsPerMinute}
                    setWordsPerMinute={setWordsPerMinute}
                    feedbackStrictness={feedbackStrictness}
                    setFeedbackStrictness={setFeedbackStrictness}
                    onBack={() => setStep(1)}
                    onStart={handleGenerate}
                />
            );
        }
        return null;
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: 2,
            }}
        >
            {step === 1 && (
                <Step1 t={t} mode={mode} onOptionSelect={handleOptionSelect} />
            )}
            {step === 2 && renderStep2()}
            {step === 3 && (
                <ReviewGeneratedText
                    generatedText={generatedText}
                    onAddToReadingKaraoke={handleAddToReadingKaraoke}
                    onRetry={handleRetry}
                />
            )}
        </Box>
    );
}
