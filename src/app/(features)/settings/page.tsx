"use client";

import { Box, Button, Card, FormControl, FormLabel, Input, Stack, Switch, Typography, Select, Option } from "@mui/joy";
import { useTranslations, useLocale } from "next-intl";
import { setCookie, getCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";

export default function Settings() {
    const t = useTranslations("settings");
    const [locale, setLocale] = useState<string>(useLocale());

    useEffect(() => {
        const savedLocale = getCookie("locale");
        if (savedLocale) {
            setLocale(savedLocale);
        }
    }, []);

    const handleLocaleChange = (newLocale: string) => {
        setLocale(newLocale);
        setCookie("locale", newLocale, 86400 * 7);
        window.location.reload(); // Reload to apply the new locale
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: { xs: 2, md: 4 },
                width: "100%",
                maxWidth: 600,
                mx: "auto",
            }}
        >
            <Typography level="h2" sx={{ mb: 4, textAlign: "center" }}>
                {t("title")}
            </Typography>
            <Card variant="outlined" sx={{ width: "100%", padding: { xs: 2, md: 4 } }}>
                <Stack spacing={3}>
                    <FormControl>
                        <FormLabel>{t("usernameLabel")}</FormLabel>
                        <Input placeholder={t("usernamePlaceholder")} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>{t("emailLabel")}</FormLabel>
                        <Input type="email" placeholder={t("emailPlaceholder")} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>{t("passwordLabel")}</FormLabel>
                        <Input type="password" placeholder={t("passwordPlaceholder")} />
                    </FormControl>

                    <FormControl orientation="horizontal" sx={{ justifyContent: "space-between" }}>
                        <FormLabel>{t("notificationsLabel")}</FormLabel>
                        <Switch />
                    </FormControl>

                    <FormControl>
                        <FormLabel>{t("localeLabel")}</FormLabel>
                        <Select
                            value={locale}
                            onChange={(event, newValue) => handleLocaleChange(newValue!)}
                        >
                            <Option value="en">{t("english")}</Option>
                            <Option value="fr">{t("french")}</Option>
                            <Option value="es">{t("spanish")}</Option>
                            <Option value="ru">{t("russian")}</Option>
                            <Option value="zh">{t("chinese")}</Option>
                        </Select>
                    </FormControl>

                    <Button variant="solid" sx={{ mt: 2 }}>
                        {t("saveButton")}
                    </Button>
                </Stack>
            </Card>
        </Box>
    );
}
