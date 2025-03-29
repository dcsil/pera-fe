"use client";

import { Mic } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { FlacAudioRecorder } from "@/lib/flac-audio-recorder";

export default function RecordButton() {
    const [recording, setRecording] = useState(false);
    const recorderRef = useRef(new FlacAudioRecorder());

    async function handleClick() {
        if (recording) {
            await stop();
            setRecording(false);
        }
        else {
            await record();
            setRecording(true);
        }
    }

    async function record() {
        await recorderRef.current.record();
    }

    async function stop() {
        const blob = await recorderRef.current.stop();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.flac";
        a.click();
    }

    return (
        <>
            <IconButton color={recording ? "secondary" : "primary"} onClick={handleClick}>
                <Mic sx={{ fontSize: 60 }} />
            </IconButton>
        </>
    );
}
