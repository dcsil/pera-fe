import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

interface ActivitiesCompletedProps {
    count: number;
}

export default function ActivitiesCompleted({ count }: Readonly<ActivitiesCompletedProps>) {
    const t = useTranslations("dashboard");
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "sm",
                bgcolor: "background.surface",
                textAlign: "center",
            }}
        >
            <Typography level="h5" sx={{ color: "text.secondary" }}>
                {t("activitiesCompleted.title")}
            </Typography>
            <Typography level="h2" fontWeight="bold" mt={1}>
                {count}
            </Typography>
        </Box>
    );
}
