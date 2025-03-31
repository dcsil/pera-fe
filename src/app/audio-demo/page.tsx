"use client";

import RecordButton from "@/components/RecordButton";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHero = styled(Box)(() => ({
    minHeight: "100vh",
    // background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
    display: "flex",
    alignItems: "center",
    color: "black",
}));

export default function AudioDemo() {
    return (
        <StyledHero>
            <Container>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 4,
                }}
                >
                    <RecordButton onBlobReady={(blob: Blob) => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "recording.flac";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }}
                    />
                </Box>
            </Container>
        </StyledHero>
    );
}
