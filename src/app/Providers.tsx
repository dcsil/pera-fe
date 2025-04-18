"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { useServerInsertedHTML } from "next/navigation";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { useState } from "react";

import theme from "@/theme";

// See the guide at https://mui.com/joy-ui/integrations/next-js-app-router/
export function Providers({
    children,
    messages,
    locale,
}: Readonly<{
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
}>) {
    const [{ cache, flush }] = useState(() => {
        const cache = createCache({ key: "joy" });
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                <NextIntlClientProvider messages={messages} locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </CssVarsProvider>
        </CacheProvider>
    );
}
