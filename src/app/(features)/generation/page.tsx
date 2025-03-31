"use client";

import { Box } from "@mui/joy";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Step1 from "./components/Step1";
import ImportSection from "./components/ImportSection";
import GenerateSection from "./components/GenerateSection";

export default function Generation() {
    const router = useRouter();
    const params = useSearchParams();
    const t = useTranslations("generation");
    const mode = params?.get("mode") || null;
    const [step, setStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState<"import" | "generate" | "history" | null>(null);
    const [fileType, setFileType] = useState("text file");
    const [teleprompter, setTeleprompter] = useState(false);
    const [wordsPerMinute, setWordsPerMinute] = useState(120);
    const [feedbackStrictness, setFeedbackStrictness] = useState(50);
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState(5);

    const handleOptionSelect = (option: "import" | "generate" | "history") => {
        setSelectedOption(option);
        setStep(2);
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
                    onStart={() => router.push("/scripted-assessment/reading-karaoke")}
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
                    onStart={() => router.push("/scripted-assessment/reading-karaoke")}
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
            {step === 1
                ? (<Step1 t={t} mode={mode} onOptionSelect={handleOptionSelect} />)
                : (renderStep2())}
        </Box>
    );
}
