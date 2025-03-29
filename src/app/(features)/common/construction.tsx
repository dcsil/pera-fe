"use client";

import { Box, Button, Typography, Stack } from "@mui/joy";
import { Construction } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { SPACING } from "@/theme";

export default function UnderConstruction() {
    const t = useTranslations("constructionPage");

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: theme =>
                    `linear-gradient(45deg, ${theme.palette.secondary.solidHoverBg} 10%, ${theme.palette.primary.solidHoverBg} 90%)`,
                display: "flex",
                alignItems: "center",
                color: "text.primary",
            }}
        >
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
                <Construction sx={{ fontSize: 64, color: "text.primary" }} />
                <Typography level="h2" fontWeight="bold">
                    {t("title")}
                </Typography>
                <Typography
                    level="body-md"
                    // @ts-expect-error: Type '"text.primary"' is not assignable to the expected type
                    color="text.primary"
                >
                    {t("subtitle")}
                </Typography>
                <Button
                    variant="solid"
                    size="lg"
                    href="mailto:teamlexislabs@outlook.com"
                    component="a"
                    sx={{
                        "backgroundColor": "primary.solidBg",
                        "color": "primary.solidColor",
                        "&:hover": {
                            backgroundColor: "primary.solidHoverBg",
                        },
                    }}
                >
                    {t("contactButton")}
                </Button>
            </Stack>
        </Box>
    );
}
