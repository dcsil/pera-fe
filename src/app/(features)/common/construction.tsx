"use client";

import { Box, Button, Typography, Stack, styled } from "@mui/material";
import { Construction } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { SPACING } from "@/theme";

const StyledHeroContainer = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
}));

export default function UnderConstruction() {
    const t = useTranslations("constructionPage");

    return (
        <StyledHeroContainer>
            <Stack
                spacing={SPACING.SECTION_GAP}
                alignItems="center"
                sx={{
                    width: "100%",
                    maxWidth: "md",
                    mx: "auto",
                    px: 3,
                    textAlign: "center",
                }}
            >
                <Construction sx={{ fontSize: 60 }} />
                <Typography variant="h2" fontWeight="bold">
                    {t("title")}
                </Typography>
                <Typography variant="h5">
                    {t("subtitle")}
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    href="mailto:teamlexislabs@outlook.com"
                    sx={{
                        "bgcolor": "background.paper",
                        "color": "primary.main",
                        "&:hover": {
                            bgcolor: "background.default",
                        },
                    }}
                >
                    {t("contactButton")}
                </Button>
            </Stack>
        </StyledHeroContainer>
    );
}
