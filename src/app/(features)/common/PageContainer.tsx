"use client";

import { Box, Container } from "@mui/joy";

interface PageContainerProps {
    children: React.ReactNode;
}

export function PageContainer({ children }: Readonly<PageContainerProps>) {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    alignItems: "center",
                    minHeight: "80vh",
                }}
            >
                {children}
            </Box>
        </Container>
    );
}
