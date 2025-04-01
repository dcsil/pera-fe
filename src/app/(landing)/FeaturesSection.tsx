"use client";

import { Container, Typography, Card, Box, useTheme } from "@mui/joy";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
    const t = useTranslations("landing");
    const featureKeys = ["interactiveLearning", "aiPoweredInsights", "multilingualSupport"];
    const theme = useTheme();

    return (
        <Container sx={{ padding: theme.spacing(8, 0) }}>
            <Typography
                level="h2"
                textAlign="center"
                fontWeight="lg"
                gutterBottom
                sx={{ color: theme.vars.palette.text.primary }}
            >
                {t("features.title")}
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: theme.spacing(3),
                    marginTop: theme.spacing(4),
                }}
            >
                {featureKeys.map(key => (
                    <Card
                        key={key}
                        variant="outlined"
                        sx={{
                            padding: theme.spacing(2),
                            backgroundColor: theme.vars.palette.background.surface,
                        }}
                    >
                        <Typography
                            level="h4"
                            fontWeight="lg"
                            sx={{ color: theme.vars.palette.text.primary }}
                        >
                            {t(`features.items.${key}.title`)}
                        </Typography>
                        <Typography sx={{ color: theme.vars.palette.text.secondary }}>
                            {t(`features.items.${key}.description`)}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}
