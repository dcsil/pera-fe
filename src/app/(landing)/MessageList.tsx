"use client";

import { Box, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";

interface MessageListProps {
    messageKeys: string[];
}

export default function MessageList({ messageKeys }: MessageListProps) {
    const t = useTranslations("messages");

    return (
        <Box>
            {messageKeys.map((key, index) => (
                <Typography key={index} level="body-sm">
                    {t(key)}
                </Typography>
            ))}
        </Box>
    );
}
