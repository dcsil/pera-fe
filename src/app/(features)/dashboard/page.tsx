"use client";

import OverallScore from "./components/OverallScore";
import PerformanceMetrics from "./components/PerformanceMetrics";
import ActivityBreakdown from "./components/ActivityBreakdown";
import PeerComparison from "./components/PeerComparison";
import RecentActivity from "./components/RecentActivity";
import FluencyRating from "./components/FluencyRating";
import ActivitiesCompleted from "./components/ActivitiesCompleted";
import LearningStreak from "./components/LearningStreak";
import InteractiveChart from "./components/InteractiveChart";
import { Box, Grid, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

export default function Dashboard() {
    const t = useTranslations("dashboard");
    return (
        <Box
            sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // Full viewport height
                boxSizing: "border-box",
            }}
        >
            <Typography level="h4" fontWeight="bold" mb={3}>
                {t("title")}
            </Typography>
            <Grid container spacing={2} alignItems="stretch" sx={{ flex: "1 1 auto" }}>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <OverallScore />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <FluencyRating />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <ActivitiesCompleted />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <LearningStreak />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                mt={2}
                sx={{ flex: "1 1 auto", display: "flex" }}
                alignItems="stretch"
            >
                <Grid
                    xs={12}
                    md={8}
                    container
                    direction="column"
                    spacing={2}
                    sx={{ flex: "1 1 auto", display: "flex" }}
                >
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <InteractiveChart />
                    </Grid>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                    >
                        <PerformanceMetrics />
                    </Grid>
                </Grid>
                <Grid
                    xs={12}
                    md={4}
                    container
                    direction="column"
                    spacing={2}
                    sx={{ flex: "1 1 auto", display: "flex" }}
                >
                    <Grid
                        sx={{
                            flex: 7,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ActivityBreakdown />
                    </Grid>
                    <Grid
                        sx={{
                            flex: 3,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <PeerComparison />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2} alignItems="stretch" sx={{ flex: "0 0 auto" }}>
                <Grid xs={12} sx={{ display: "flex", flexDirection: "column" }}>
                    <RecentActivity />
                </Grid>
            </Grid>
        </Box>
    );
}
