"use client";

import { FlacAudioRecorder } from "@/lib/flac-audio-recorder";
import { Mic, Stop } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

interface RecordButtonProps {
    onBlobReady: (blob: Blob) => void;
}

export default function RecordButton({ onBlobReady }: Readonly<RecordButtonProps>) {
    const t = useTranslations("recordButton");
    const [isRecording, setIsRecording] = useState(false);
    const recorderRef = useRef(new FlacAudioRecorder());

    async function handleClick() {
        if (isRecording) {
            await stop();
            setIsRecording(false);
        }
        else {
            await record();
            setIsRecording(true);
        }
    }

    async function record() {
        await recorderRef.current.record();
    }

    async function stop() {
        const blob = await recorderRef.current.stop();
        onBlobReady(blob);
    }

    return (
        <Button
            variant="contained"
            size="large"
            onClick={handleClick}
            startIcon={isRecording ? <Stop /> : <Mic />}
            color={isRecording ? "error" : "primary"}
            sx={{ px: 4 }}
        >
            {isRecording ? t("stop") : t("start")}
        </Button>
    );
}
