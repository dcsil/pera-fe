import { useTranslations } from "next-intl";
import { Box, Typography, Button } from "@mui/joy";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Week 1", progress: 20 },
    { name: "Week 2", progress: 45 },
    { name: "Week 3", progress: 62 },
    { name: "Week 4", progress: 85 },
];

export default function ProgressOverTime() {
    const t = useTranslations("dashboard");

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                height: "fill-available",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography level="h3" fontWeight="bold" mb={2} sx={{ color: "text.primary" }}>
                {t("progressOverTime.title")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Button variant="plain">{t("progressOverTime.filters.week")}</Button>
                <Button variant="plain">{t("progressOverTime.filters.month")}</Button>
                <Button variant="plain">{t("progressOverTime.filters.year")}</Button>
            </Box>
            <Box
                sx={{
                    height: "300px",
                    borderRadius: "8px",
                    bgcolor: "neutral.outlinedBg",
                    p: 2,
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="progress"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
