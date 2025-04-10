"use client";

import { Box, Container, Typography, Button } from "@mui/joy";
import { styled, useTheme } from "@mui/joy/styles";
import { Construction } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import FeaturesSection from "./(landing)/FeaturesSection";
import TestimonialsSection from "./(landing)/TestimonialsSection";
import CallToActionSection from "./(landing)/CallToActionSection";

const StyledHero = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    background: `linear-gradient(45deg, ${theme.palette.primary.solidBg} 30%, ${theme.palette.primary.solidHoverBg} 90%)`,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
}));

export default function Home() {
    const t = useTranslations("landing");
    const theme = useTheme();

    return (
        <>
            <StyledHero>
                <Container>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            gap: 4,
                        }}
                    >
                        <Construction sx={{ color: theme.palette.common.white }} />
                        <Typography level="h1" fontWeight="lg" sx={{ color: theme.palette.common.white }}>
                            {t("hero.title")}
                        </Typography>
                        <Typography level="h4" sx={{ color: theme.palette.common.white }}>
                            {t("hero.subtitle")}
                        </Typography>
                        <Button
                            variant="solid"
                            size="lg"
                            href="/sign-up"
                            component="a"
                            sx={{
                                "backgroundColor": theme.palette.common.white,
                                "color": theme.palette.primary.solidBg,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.softHoverBg,
                                },
                            }}
                        >
                            {t("cta.button")}
                        </Button>
                    </Box>
                </Container>
            </StyledHero>

            <FeaturesSection />
            <TestimonialsSection />
            <CallToActionSection />
        </>
    );
}
