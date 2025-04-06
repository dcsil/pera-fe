"use client";

import { Box } from "@mui/joy";
import { styled } from "@mui/joy/styles";

const StyledHero = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    background: `linear-gradient(45deg, ${theme.palette.primary.solidBg} 30%, ${theme.palette.primary.solidHoverBg} 90%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
}));

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StyledHero>
            {children}
        </StyledHero>
    );
}
