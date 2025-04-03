"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import theme from "@/theme";
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
        <CssVarsProvider theme={theme}>
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </CssVarsProvider>
    );
}
