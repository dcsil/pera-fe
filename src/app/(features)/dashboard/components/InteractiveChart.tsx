"use client";

import * as React from "react";
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Box, Button, Typography, Card, CardContent } from "@mui/joy";
import { useTranslations } from "next-intl";

const initialChartData = [
    { date: "2025-03-01", accuracy: 55, fluency: 52, pronunciation: 54 },
    { date: "2025-03-02", accuracy: 58, fluency: 50, pronunciation: 56 },
    { date: "2025-03-03", accuracy: 60, fluency: 54, pronunciation: 59 },
    { date: "2025-03-04", accuracy: 63, fluency: 57, pronunciation: 61 },
    { date: "2025-03-05", accuracy: 65, fluency: 55, pronunciation: 64 },
    { date: "2025-03-06", accuracy: 68, fluency: 58, pronunciation: 66 },
    { date: "2025-03-07", accuracy: 66, fluency: 60, pronunciation: 63 },
    { date: "2025-03-08", accuracy: 70, fluency: 62, pronunciation: 68 },
    { date: "2025-03-09", accuracy: 72, fluency: 65, pronunciation: 70 },
    { date: "2025-03-10", accuracy: 75, fluency: 63, pronunciation: 73 },
    { date: "2025-03-11", accuracy: 78, fluency: 67, pronunciation: 75 },
    { date: "2025-03-12", accuracy: 76, fluency: 69, pronunciation: 72 },
    { date: "2025-03-13", accuracy: 80, fluency: 71, pronunciation: 77 },
    { date: "2025-03-14", accuracy: 83, fluency: 73, pronunciation: 79 },
    { date: "2025-03-15", accuracy: 85, fluency: 75, pronunciation: 82 },
    { date: "2025-03-16", accuracy: 87, fluency: 78, pronunciation: 84 },
    { date: "2025-03-17", accuracy: 90, fluency: 76, pronunciation: 88 },
    { date: "2025-03-18", accuracy: 92, fluency: 80, pronunciation: 90 },
    { date: "2025-03-19", accuracy: 94, fluency: 83, pronunciation: 93 },
    { date: "2025-03-20", accuracy: 96, fluency: 85, pronunciation: 95 },
    { date: "2025-03-21", accuracy: 95, fluency: 87, pronunciation: 92 },
    { date: "2025-03-22", accuracy: 97, fluency: 89, pronunciation: 94 },
    { date: "2025-03-23", accuracy: 99, fluency: 91, pronunciation: 96 },
    { date: "2025-03-24", accuracy: 98, fluency: 93, pronunciation: 95 },
    { date: "2025-03-25", accuracy: 100, fluency: 95, pronunciation: 98 },
    { date: "2025-03-26", accuracy: 99, fluency: 97, pronunciation: 96 },
    { date: "2025-03-27", accuracy: 100, fluency: 98, pronunciation: 99 },
    { date: "2025-03-28", accuracy: 98, fluency: 96, pronunciation: 97 },
    { date: "2025-03-29", accuracy: 100, fluency: 99, pronunciation: 100 },
    { date: "2025-03-30", accuracy: 99, fluency: 97, pronunciation: 98 },
    { date: "2025-03-31", accuracy: 100, fluency: 99, pronunciation: 100 },
    { date: "2025-04-01", accuracy: 98, fluency: 98, pronunciation: 99 },
    { date: "2025-04-02", accuracy: 100, fluency: 100, pronunciation: 100 },
];

const chartConfig = {
    accuracy: {
        label: "Accuracy",
        color: "#8884d8",
    },
    fluency: {
        label: "Fluency",
        color: "#82ca9d",
    },
    pronunciation: {
        label: "Pronunciation",
        color: "#ffc658",
    },
};

export default function InteractiveChart() {
    const t = useTranslations("dashboard.interactiveChart");

    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("accuracy");
    const [chartData, setChartData] = React.useState(initialChartData);
    type DateRange = "day" | "week" | "month";
    const [dateRange, setDateRange] = React.useState<DateRange>("week");

    const handleDateRangeChange = (range: "day" | "week" | "month") => {
        setDateRange(range);

        let sliceLength;
        if (range === "day") {
            sliceLength = 1;
        }
        else if (range === "week") {
            sliceLength = 7;
        }
        else {
            sliceLength = 30;
        }
        const filteredData = initialChartData.slice(-sliceLength);
        setChartData(filteredData);
    };

    return (
        <Card
            sx={{
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                height: "fill-available",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    borderBottom: "1px solid",
                    borderColor: "neutral.outlinedBorder",
                    px: 2,
                    pb: 2,
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Typography level="h3" fontWeight="bold" sx={{ mb: 1 }}>
                        {t("title")}
                    </Typography>
                    <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                        {t("subtitle")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "nowrap",
                        }}
                    >
                        <Typography level="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            {t("controls.metricLabel")}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {Object.keys(chartConfig).map((key) => {
                                const metric = key as keyof typeof chartConfig;
                                return (
                                    <Button
                                        key={metric}
                                        variant={activeChart === metric ? "solid" : "plain"}
                                        color={activeChart === metric ? "primary" : "neutral"}
                                        onClick={() => setActiveChart(metric)}
                                        sx={{
                                            textTransform: "capitalize",
                                            fontWeight: activeChart === metric ? "bold" : "normal",
                                        }}
                                    >
                                        {chartConfig[metric].label}
                                    </Button>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "nowrap",
                        }}
                    >
                        <Typography level="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            {t("controls.dateRangeLabel")}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {["day", "week", "month"].map(range => (
                                <Button
                                    key={range}
                                    variant={dateRange === range ? "solid" : "plain"}
                                    color={dateRange === range ? "primary" : "neutral"}
                                    onClick={() => handleDateRangeChange(range as "day" | "week" | "month")}
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: dateRange === range ? "bold" : "normal",
                                    }}
                                >
                                    {t(`ranges.${range}`)}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <Tooltip
                                formatter={(value: number) =>
                                    `${value}%`}
                                labelFormatter={(value: string) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    });
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey={activeChart}
                                stroke={chartConfig[activeChart].color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
