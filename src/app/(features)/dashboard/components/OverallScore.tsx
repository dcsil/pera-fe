import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

interface OverallScoreProps {
    score: number;
}

export default function OverallScore({ score }: Readonly<OverallScoreProps>) {
    const t = useTranslations("dashboard");
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                textAlign: "center",
            }}
        >
            <Typography level="h5" sx={{ color: "text.secondary" }}>
                {t("overallScore.title")}
            </Typography>
            <Typography level="h2" fontWeight="bold" mt={1}>
                {score.toFixed(1)}
            </Typography>
        </Box>
    );
}
