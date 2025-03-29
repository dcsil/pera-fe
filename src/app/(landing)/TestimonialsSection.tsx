"use client";

import { Box, Container, Typography, Card, Avatar } from "@mui/joy";
import { useTranslations } from "next-intl";

export default function TestimonialsSection() {
    const t = useTranslations("landing");
    const testimonialKeys = ["john", "jane", "carlos"];

    return (
        <Box sx={{ width: "100%", backgroundColor: "background.body", padding: "4rem 0" }}>
            <Container>
                <Typography
                    level="h2"
                    textAlign="center"
                    fontWeight="lg"
                    gutterBottom
                    sx={{ color: "text.primary", fontSize: "2rem" }}
                >
                    {t("testimonials.title")}
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.5rem",
                        marginTop: "2rem",
                    }}
                >
                    {testimonialKeys.map(key => (
                        <Card key={key} variant="outlined" sx={{ padding: 2, backgroundColor: "background.surface" }}>
                            <Avatar
                                alt={t(`testimonials.items.${key}.name`)}
                                sx={{ width: 56, height: 56, margin: "0 auto 1rem" }}
                            />
                            <Typography
                                level="h4"
                                fontWeight="lg"
                                textAlign="center"
                                sx={{ fontSize: "1.25rem", color: "text.primary" }}
                            >
                                {t(`testimonials.items.${key}.name`)}
                            </Typography>
                            <Typography textAlign="center" sx={{ fontSize: "1rem", color: "text.secondary" }}>
                                {t(`testimonials.items.${key}.feedback`)}
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
