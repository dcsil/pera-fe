import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/joy";

export default function ActivitiesCompleted() {
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
                {t("activitiesCompleted.title")}
            </Typography>
            <Typography level="h2" fontWeight="bold" mt={1}>
                {t("activitiesCompleted.count")}
            </Typography>
            <Typography level="body-sm" sx={{ color: "success.solidActiveBg" }} mt={0.5}>
                {t("activitiesCompleted.change")}
            </Typography>
        </Box>
    );
}
