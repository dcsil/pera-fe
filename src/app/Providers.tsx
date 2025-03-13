"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

export function Providers({
    children,
    messages,
    locale,
}: Readonly<{
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
}>) {
    return (
        <ThemeProvider theme={theme}>
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
