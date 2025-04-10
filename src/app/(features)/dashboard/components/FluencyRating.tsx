import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

interface FluencyRatingProps {
    rating: number;
}

export default function FluencyRating({ rating }: Readonly<FluencyRatingProps>) {
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
                {Number(rating.toFixed(1)) * 20}
            </Typography>
        </Box>
    );
}
