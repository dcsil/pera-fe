"use client";

import {
    Box,
    Container,
    Typography,
    Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Construction } from "@mui/icons-material";

const StyledHero = styled(Box)(() => ({
    minHeight: "100vh",
    background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
    display: "flex",
    alignItems: "center",
    color: "black",
}));

export default function Home() {
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
                        Pera by LexisLabs
                    </Typography>
                    <Typography variant="h5">
                        We&apos;re building something special. Coming soon.
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
                        Contact Us
                    </Button>
                </Box>
            </Container>
        </StyledHero>
    );
}
