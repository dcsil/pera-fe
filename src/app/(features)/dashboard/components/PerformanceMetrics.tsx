import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/joy/styles";

interface PerformanceMetricsProps {
    fluency: number;
    accuracy: number;
    pronunciation: number;
}

export default function PerformanceMetrics({ fluency, accuracy, pronunciation }: Readonly<PerformanceMetricsProps>) {
    const t = useTranslations("dashboard");
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                height: "fill-available",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography level="h3" fontWeight="bold" mb={2} sx={{ color: "text.primary" }}>
                {t("performanceMetrics.title")}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row", // Stack vertically on small screens
                    gap: 2,
                    flex: 1,
                    alignItems: isSmallScreen ? "stretch" : "center",
                }}
            >
                {[
                    { label: "pronunciation", value: pronunciation },
                    { label: "fluency", value: fluency },
                    { label: "accuracy", value: accuracy },
                ].map(metric => (
                    <Box
                        key={metric.label}
                        sx={{
                            flex: 1,
                            textAlign: "center",
                            p: 1,
                            borderRadius: "8px",
                            bgcolor: "neutral.outlinedBg",
                            height: "fill-available",
                            alignContent: "center",
                        }}
                    >
                        <Typography level="body-md" fontWeight="bold" sx={{ color: "text.primary" }}>
                            {t(`performanceMetrics.metrics.${metric.label}`)}
                        </Typography>
                        <Typography level="h2" fontWeight="bold" mt={1} sx={{ color: "text.primary" }}>
                            {metric.value.toFixed(1)}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
