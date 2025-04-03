"use client";

import { Button, Stack, Typography } from "@mui/joy";
import { Upload, History, AutoFixHigh } from "@mui/icons-material";

interface Step1Props {
    t: (key: string) => string;
    mode: string | null;
    onOptionSelect: (option: "import" | "generate" | "history") => void;
}

export default function Step1({ t, mode, onOptionSelect }: Step1Props) {
    return (
        <Stack spacing={4} alignItems="center" sx={{ padding: { xs: 2, md: 4 } }}>
            <Typography level="h2" fontWeight="xl" textAlign="center">
                {t("title" + "." + (mode?.toLowerCase() ?? "rk"))}
            </Typography>
            <Typography level="h4" sx={{ color: "text.secondary", textAlign: "center" }}>
                {t("subtitle")}
            </Typography>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="solid"
                    startDecorator={<Upload sx={{ fontSize: 40 }} />}
                    onClick={() => onOptionSelect("import")}
                    sx={{
                        fontSize: "1rem",
                        padding: { xs: "1rem 1.5rem", md: "1.5rem 2rem" },
                        minWidth: { xs: 150, md: 200 },
                    }}
                >
                    {t("step1.import")}
                </Button>
                <Button
                    variant="solid"
                    startDecorator={<AutoFixHigh sx={{ fontSize: 40 }} />}
                    onClick={() => onOptionSelect("generate")}
                    sx={{
                        fontSize: "1rem",
                        padding: { xs: "1rem 1.5rem", md: "1.5rem 2rem" },
                        minWidth: { xs: 150, md: 200 },
                    }}
                >
                    {t("step1.generate")}
                </Button>
                <Button
                    variant="solid"
                    startDecorator={<History sx={{ fontSize: 40 }} />}
                    disabled
                    sx={{
                        fontSize: "1rem",
                        padding: { xs: "1rem 1.5rem", md: "1.5rem 2rem" },
                        minWidth: { xs: 150, md: 200 },
                    }}
                >
                    {t("step1.historyDisabled")}
                </Button>
            </Stack>
        </Stack>
    );
}
