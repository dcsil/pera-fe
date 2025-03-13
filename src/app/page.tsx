"use client";

import {
    Box,
    Container,
    Typography,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Construction } from "@mui/icons-material";
import { useTranslations } from "next-intl";

const StyledHero = styled(Box)(() => ({
    minHeight: "100vh",
    background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
    display: "flex",
    alignItems: "center",
    color: "black",
}));

export default function Home() {
    const t = useTranslations("constructionPage");
    return (
        <StyledHero>
            <Container>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 4,
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
                            "backgroundColor": "white",
                            "color": "primary.main",
                            "&:hover": {
                                backgroundColor: "grey.100",
                            },
                        }}
                    >
                        {t("contactButton")}
                    </Button>
                </Box>
            </Container>
        </StyledHero>
    );
}
