import { useTranslations } from "next-intl";
import { Box, Typography } from "@mui/joy";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export default function ActivityBreakdown() {
    const t = useTranslations("dashboard");

    const activities = [
        { label: t("activityBreakdown.breakdown.reading"), value: 45, color: "var(--joy-palette-primary-solidBg)" },
        { label: t("activityBreakdown.breakdown.conversation"), value: 35, color: "var(--joy-palette-secondary-solidBg)" },
        { label: t("activityBreakdown.breakdown.pronunciation"), value: 20, color: "var(--joy-palette-success-solidBg)" },
    ];

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                display: "flex",
                flexDirection: "column",
                height: "fill-available",
            }}
        >
            <Typography level="h3" fontWeight="bold" mb={2} sx={{ color: "text.primary" }}>
                {t("activityBreakdown.title")}
            </Typography>
            <Box sx={{ flex: 1, minHeight: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={activities}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius="70%"
                            innerRadius="50%"
                            paddingAngle={5}
                        >
                            {activities.map((activity, index) => (
                                <Cell key={`cell-${index}`} fill={activity.color} />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="bottom"
                            wrapperStyle={{
                                paddingTop: "16px", // Add spacing between the chart and legend
                            }}
                            formatter={(value, entry, index) => (
                                <Typography level="h4" sx={{ px: "5px", color: "text.secondary" }}>
                                    {activities[index].label}
                                </Typography>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
