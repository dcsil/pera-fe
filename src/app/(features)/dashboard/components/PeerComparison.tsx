import { useTranslations } from "next-intl";
import { Box, Typography, CircularProgress } from "@mui/joy";

export default function PeerComparison() {
    const t = useTranslations("dashboard");
    const percentile = 75;

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                textAlign: "center",
                height: "fill-available",
            }}
        >
            <Typography level="h3" fontWeight="bold" sx={{ color: "text.primary" }} textAlign="left">
                {t("peerComparison.title")}
            </Typography>
            <Box
                sx={{
                    position: "relative",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                }}
            >
                <CircularProgress
                    thickness={6}
                    determinate
                    value={percentile}
                    sx={{
                        "--CircularProgress-size": "120px",
                        "--CircularProgress-progressColor": "var(--joy-palette-primary-solidBg)",
                        "--CircularProgress-trackColor": "var(--joy-palette-neutral-outlinedBg)",
                    }}
                />
                <Typography
                    level="h2"
                    fontWeight="bold"
                    sx={{
                        position: "absolute",
                        top: "40%",
                        transform: "translateY(-50%)",
                        color: "text.primary",
                    }}
                >
                    {percentile + "th"}
                </Typography>
                <Typography
                    level="body-sm"
                    fontWeight="bold"
                    sx={{
                        position: "absolute",
                        top: "60%",
                        transform: "translateY(-50%)",
                        color: "text.secondary",
                    }}
                >
                    {t("peerComparison.percentile")}
                </Typography>
            </Box>
        </Box>
    );
}
