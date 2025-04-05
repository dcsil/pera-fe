import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/joy";

export default function RecentActivity() {
    const t = useTranslations("dashboard");

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
            }}
        >
            <Typography level="h3" fontWeight="bold" mb={2} sx={{ color: "text.primary" }}>
                {t("recentActivity.title")}
            </Typography>
            <Typography level="body-md" sx={{ color: "text.secondary" }}>
                {t("recentActivity.activity")}
            </Typography>
        </Box>
    );
}
