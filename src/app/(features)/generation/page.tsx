"use client";

import { Button, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Generation() {
    const router = useRouter();
    const t = useTranslations("common.nav");
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}
        >
            <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/scripted-assessment/reading-karaoke")}
                sx={{
                    padding: "16px 32px",
                    fontSize: "1.2rem",
                }}
            >
                {t("readingKaraoke")}
            </Button>
        </Box>
    );
}
