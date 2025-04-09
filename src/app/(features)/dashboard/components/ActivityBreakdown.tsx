import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { capitalize } from "@/utils/stringUtils"; // Import the capitalize function

interface ActivityBreakdownProps {
    activities: Array<{
        label: string;
        value: number;
    }>;
}

const colorMapping: Record<string, string> = {
    reading: "var(--joy-palette-primary-solidBg)",
    conversation: "var(--joy-palette-secondary-solidBg)",
    pronunciation: "var(--joy-palette-success-solidBg)",
};

export default function ActivityBreakdown({ activities }: Readonly<ActivityBreakdownProps>) {
    const t = useTranslations("dashboard");

    const activitiesWithColors = activities.map(activity => ({
        ...activity,
        label: capitalize(activity.label),
        color: colorMapping[activity.label.toLowerCase()] || "#000000",
    }));

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
                            data={activitiesWithColors}
                            dataKey="value"
                            nameKey="label"
                            cx="50%"
                            cy="50%"
                            outerRadius="70%"
                            innerRadius="50%"
                            paddingAngle={5}
                        >
                            {activitiesWithColors.map(activity => (
                                <Cell
                                    key={activity.label}
                                    fill={activity.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                const translatedName = t(`activityBreakdown.breakdown.${name.toLowerCase()}`, { name });
                                return [`${value.toFixed(1)}%`, translatedName];
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            wrapperStyle={{
                                paddingTop: "16px",
                            }}
                            formatter={(value: string) => {
                                const translatedName = t(`activityBreakdown.breakdown.${value.toLowerCase()}`, { value });
                                return (
                                    <Typography level="body-lg" sx={{ px: "5px", color: "text.secondary" }}>
                                        {translatedName}
                                    </Typography>
                                );
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
