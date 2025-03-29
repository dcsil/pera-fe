import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pera",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <title>{String(metadata.title)}</title>
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Providers messages={messages} locale={locale}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
