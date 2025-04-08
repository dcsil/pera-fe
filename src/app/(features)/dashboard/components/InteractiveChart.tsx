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

export default function InteractiveChart({ data }: Readonly<{ data: Array<{ date: string; accuracy: number; fluency: number; pronunciation: number }> }>) {
    const t = useTranslations("dashboard.interactiveChart");

    const chartConfig = {
        accuracy: {
            label: t("metrics.accuracy"),
            color: "#8884d8",
        },
        fluency: {
            label: t("metrics.fluency"),
            color: "#82ca9d",
        },
        pronunciation: {
            label: t("metrics.pronunciation"),
            color: "#ffc658",
        },
    };

    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("accuracy");
    const [chartData, setChartData] = React.useState(data);
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
        const filteredData = data.slice(-sliceLength);
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
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                        gap: 2,
                        mb: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "stretch", sm: "center" },
                            gap: 1,
                            flexWrap: "wrap",
                        }}
                    >
                        <Typography level="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            {t("controls.metricLabel")}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
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
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "stretch", sm: "center" },
                            gap: 1,
                        }}
                    >
                        <Typography level="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
                            {t("controls.dateRangeLabel")}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
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
                        <LineChart key={`${dateRange}-${activeChart}`} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString(t("locale"), {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <Tooltip
                                formatter={(value: number, name: string) => {
                                    const translatedName = chartConfig[name as keyof typeof chartConfig]?.label || name;
                                    return [`${value}%`, translatedName];
                                }}
                                labelFormatter={(value: string) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString(t("locale"), {
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
