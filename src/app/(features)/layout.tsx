"use client";

import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ErrorOutline, Home, Mic, Book, Settings } from "@mui/icons-material";

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
    {
        path: "/dashboard",
        finalPath: "/dashboard",
        label: "dashboard",
        icon: Home,
    },
    {
        path: "/generation?mode=RK",
        finalPath: "/scripted-assessment/reading-karaoke",
        label: "readingKaraoke",
        icon: Mic,
    },
    {
        path: "/generation?mode=LR",
        finalPath: "/scripted-assessment/long-reading",
        label: "longReading",
        icon: Book,
    },
    {
        path: "/settings",
        finalPath: "/settings",
        label: "settings",
        icon: Settings,
    },
    {
        path: "/sentry-example-page",
        finalPath: "/sentry-example-page",
        label: "sentry",
        icon: ErrorOutline,
    },
] as const;

export default function FeaturesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const t = useTranslations("common.nav");
    const pathname = usePathname();
    const params = useSearchParams();

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            <Drawer
                variant="permanent"
                sx={{
                    "width": DRAWER_WIDTH,
                    "flexShrink": 0,
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                    },
                }}
            >
                <List sx={{ mt: 8 }}>
                    {NAV_ITEMS.map(({ path, finalPath, label, icon: Icon }) => {
                        const isSelected = (() => {
                            if (pathname === finalPath) return true;
                            const mode = params.get("mode");
                            if (pathname.startsWith("/generation") && mode === "RK" && finalPath === "/scripted-assessment/reading-karaoke") {
                                return true;
                            }
                            if (pathname.startsWith("/generation") && mode === "LR" && finalPath === "/scripted-assessment/long-reading") {
                                return true;
                            }
                            return false;
                        })();
                        return (
                            <ListItemButton
                                key={path}
                                component={Link}
                                href={path}
                                selected={isSelected}
                                sx={{
                                    "&.Mui-selected": {
                                        "backgroundColor": "primary.main",
                                        "color": "primary.contrastText",
                                        "&:hover": {
                                            backgroundColor: "primary.dark",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <Icon color={isSelected ? "inherit" : "primary"} />
                                </ListItemIcon>
                                <ListItemText primary={t(label)} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    minHeight: "100vh",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
