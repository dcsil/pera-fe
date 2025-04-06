"use client";

import { Box, Button, Card, FormControl, FormHelperText, FormLabel, Input, Link, Stack, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { BACKEND } from "@/lib/urls";

function SignUpForm({ onSignUpSuccess }: { onSignUpSuccess: () => void }) {
    const t = useTranslations("signUpPage");
    // Form values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // Will only trigger when submit is attempted, and will not re-validate between submissions
    const [passwordError, setPasswordError] = useState(false);
    const [emailInUseError, setEmailInUseError] = useState(false);

    async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);

        const url = `${BACKEND}/accounts/sign-up/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                base_language: "en",
            }),
        });
        if (!response.ok) {
            // TODO: Do something
            return;
        }
        const json = await response.json();
        if (json.success) {
            onSignUpSuccess();
        }
        // TODO: BE should change this to a more machine-readable message
        else if (json.message == "Email already in use.") {
            setEmailInUseError(true);
        }
    }

    // TODO: Error feedback currently use browser built-in messages. They should
    // be changed to provide a better user experience, maybe with react-hook-form.
    return (
        <form onSubmit={handleSignUp}>
            <Stack spacing={2}>
                <Typography level="h4">{t("title")}</Typography>
                <FormControl>
                    <FormLabel>{t("nameLabel")}</FormLabel>
                    <Input
                        required
                        placeholder={t("namePlaceholder")}
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl error={emailInUseError}>
                    <FormLabel>{t("emailLabel")}</FormLabel>
                    <Input
                        required
                        placeholder={t("emailPlaceholder")}
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {emailInUseError && (
                        <FormHelperText>
                            {t("emailInUseError")}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>{t("passwordLabel")}</FormLabel>
                    <Input
                        required
                        placeholder={t("passwordPlaceholder")}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl error={passwordError}>
                    <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                    <Input
                        required
                        placeholder={t("confirmPasswordPlaceholder")}
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && (
                        <FormHelperText>
                            {t("passwordMismatchError")}
                        </FormHelperText>
                    )}
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ mr: 2 }}>
                        {t("alreadyHaveAccountPrompt")}
                        <Link href="/login">
                            {t("toLoginLabel")}
                        </Link>
                    </Typography>
                    <Button variant="solid" type="submit">
                        {t("submitButton")}
                    </Button>
                </Box>
            </Stack>
        </form>
    );
}

export default function SignUpPage() {
    const t = useTranslations("signUpPage");

    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const router = useRouter();

    function handleSignUpSuccess() {
        setSignUpSuccess(true);
        setTimeout(() => {
            router.push("/login");
        }, 2000);
    }

    return (
        <Stack spacing={4} alignItems="center" sx={{ width: "100%", maxWidth: 800, padding: { xs: 2, md: 4 } }}>
            <Card variant="outlined" sx={{ width: "100%", padding: { xs: 2, md: 4 } }}>
                { signUpSuccess && (
                    <Typography level="h4" sx={{ textAlign: "center" }}>
                        {t("success")}
                    </Typography>
                )}
                { !signUpSuccess
                && <SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
            </Card>
        </Stack>
    );
}
