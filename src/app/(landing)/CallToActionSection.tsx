"use client";

import { Container, Box, Typography, Button } from "@mui/joy";
import { useTheme } from "@mui/joy/styles"; // Import useTheme hook
import { useTranslations } from "next-intl";

export default function CallToActionSection() {
    const t = useTranslations("landing");
    const theme = useTheme(); // Access the theme

    return (
        <Container sx={{ padding: "4rem 0" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 4,
                }}
            >
                <Typography level="h2" fontWeight="lg" sx={{ color: theme => theme.palette.common.white }}>
                    {t("cta.title")}
                </Typography>
                <Typography fontWeight="lg" sx={{ color: theme => theme.palette.common.white }}>
                    {t("cta.subtitle")}
                </Typography>
                <Button
                    variant="solid"
                    size="lg"
                    href="mailto:teamlexislabs@outlook.com"
                    component="a"
                    sx={{
                        "backgroundColor": theme.palette.primary.solidBg,
                        "color": theme.palette.primary.solidColor,
                        "&:hover": {
                            backgroundColor: theme.palette.primary.solidHoverBg,
                        },
                    }}
                >
                    {t("cta.button")}
                </Button>
            </Box>
        </Container>
    );
}
