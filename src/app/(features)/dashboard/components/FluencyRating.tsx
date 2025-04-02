import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/joy";

export default function FluencyRating() {
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
                {t("fluencyRating.title")}
            </Typography>
            <Typography level="h2" fontWeight="bold" mt={1}>
                {t("fluencyRating.score")}
            </Typography>
            <Typography level="body-sm" sx={{ color: "success.solidActiveBg" }} mt={0.5}>
                {t("fluencyRating.change")}
            </Typography>
        </Box>
    );
}
