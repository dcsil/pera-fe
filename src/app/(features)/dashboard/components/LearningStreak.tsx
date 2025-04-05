import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

interface LearningStreakProps {
    streak: number;
}

export default function LearningStreak({ streak }: Readonly<LearningStreakProps>) {
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
                {t("learningStreak.title")}
            </Typography>
            <Typography level="h2" fontWeight="bold" mt={1}>
                {streak + " " + t("learningStreak.days")}
            </Typography>
        </Box>
    );
}
