"use client";

import { useEffect, useState } from "react";
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
import { DashboardApiResponse, DashboardStats, DashboardDataPoint } from "./types";
import { progressDashboardSampleData } from "./sampleData";

export default function Dashboard() {
    const t = useTranslations("dashboard");
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [data, setData] = useState<DashboardDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch("/api/dashboard"); // TODO: SET API URL
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result: DashboardApiResponse = await response.json();
                setStats(result.stats);
                setData(result.data);
            }
            catch (error) {
                console.error("Error fetching dashboard data:", error);
                setStats(progressDashboardSampleData.stats);
                setData(progressDashboardSampleData.data);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading || !stats) {
        if (!loading) {
            console.error("Malformed response data from backend when obtanining progress data.");
        }
        return null;
    }

    const totalActivities
        = stats.week_reading_exercises
            + stats.week_conversation_exercises
            + stats.week_pronunciation_exercises;

    const activityBreakdownData = [
        {
            label: "reading",
            value: (stats.week_reading_exercises / totalActivities) * 100,
        },
        {
            label: "conversation",
            value: (stats.week_conversation_exercises / totalActivities) * 100,
        },
        {
            label: "pronunciation",
            value: (stats.week_pronunciation_exercises / totalActivities) * 100,
        },
    ];

    return (
        <Box
            sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                boxSizing: "border-box",
            }}
        >
            <Typography level="h4" fontWeight="bold" mb={3}>
                {t("title")}
            </Typography>
            <Grid container spacing={2} alignItems="stretch" sx={{ flex: "1 1 auto" }}>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <OverallScore score={stats.overall} />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <FluencyRating rating={stats.fluency_rating} />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <ActivitiesCompleted count={stats.count} />
                </Grid>
                <Grid xs={12} sm={6} md={3} sx={{ display: "flex", flexDirection: "column" }}>
                    <LearningStreak streak={stats.streak} />
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
                        <InteractiveChart data={data} />
                    </Grid>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                    >
                        <PerformanceMetrics
                            fluency={stats.week_fluency}
                            accuracy={stats.week_accuracy}
                            pronunciation={stats.week_pronunciation}
                        />
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
                        <ActivityBreakdown
                            activities={activityBreakdownData}
                        />
                    </Grid>
                    <Grid
                        sx={{
                            flex: 3,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <PeerComparison percentile={stats.percentile} />
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
