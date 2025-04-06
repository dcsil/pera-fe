"use client";

import { Button, Card, Stack, Input, FormControl, FormLabel, Typography, Link, Box } from "@mui/joy";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { BACKEND } from "@/lib/urls";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const t = useTranslations("loginPage");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);
    const router = useRouter();

    async function handleLogin() {
        const url = `${BACKEND}/accounts/login/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        });
        if (response.ok) {
            router.push("/dashboard");
        }
        else if (response.status == 401) {
            setLoginFailed(true);
        }
    }

    return (
        <Stack spacing={4} alignItems="center" sx={{ width: "100%", maxWidth: 800, padding: { xs: 2, md: 4 } }}>
            <Card variant="outlined" sx={{ width: "100%", padding: { xs: 2, md: 4 } }}>
                <Typography level="h4">{t("title")}</Typography>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>{t("emailLabel")}</FormLabel>
                        <Input
                            placeholder={t("emailPlaceholder")}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("passwordLabel")}</FormLabel>
                        <Input
                            placeholder={t("passwordPlaceholder")}
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormControl>
                    {loginFailed && (
                        <Typography color="danger">{t("loginFailed")}</Typography>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ mr: 2 }}>
                            {t("noAccountPrompt")}
                            <Link href="/sign-up">
                                {t("createAccountLabel")}
                            </Link>
                        </Typography>
                        <Button variant="solid" onClick={handleLogin}>
                            {t("submitButton")}
                        </Button>
                    </Box>
                </Stack>
            </Card>
        </Stack>
    );
}
