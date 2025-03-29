"use client";

import { Box, Drawer, List, ListItemButton, ListItemDecorator, ListItemContent, IconButton, Typography } from "@mui/joy";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ErrorOutline, Home, Mic, Book, Settings, Close, Menu } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image for the logo

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

function NavList({ onClose }: { onClose?: () => void }) {
    const t = useTranslations("common.nav");
    const pathname = usePathname() || ""; // Default to an empty string if null
    const params = useSearchParams();

    return (
        <List sx={{ mt: 8 }}>
            {/* Logo and Title */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderColor: theme => theme.palette.neutral.outlinedBorder,
                }}
            >
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                />
                <Typography
                    level="h4"
                    fontWeight="lg"
                    sx={{ color: theme => theme.palette.text.primary }}
                >
                    {t("pera")}
                </Typography>
            </Box>

            {/* Navigation Items */}
            {NAV_ITEMS.map(({ path, finalPath, label, icon: Icon }) => {
                const isSelected = (() => {
                    if (pathname === finalPath) return true;
                    const mode = params?.get("mode");
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
                        onClick={onClose} // Close the drawer on item click (for mobile)
                        sx={{
                            "&.Joy-selected": {
                                "backgroundColor": theme => theme.palette.primary.solidBg,
                                "color": theme => theme.palette.primary.solidColor,
                                "&:hover": {
                                    backgroundColor: theme => theme.palette.primary.solidHoverBg,
                                },
                            },
                        }}
                    >
                        <ListItemDecorator>
                            <Icon
                                sx={{
                                    color: theme => theme.palette.primary.solidBg,
                                }}
                            />
                        </ListItemDecorator>
                        <ListItemContent>{t(label)}</ListItemContent>
                    </ListItemButton>
                );
            })}
        </List>
    );
}

export default function FeaturesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLargeScreen, setIsLargeScreen] = useState(false); // State to track screen size
    const [isDrawerOpen, setDrawerOpen] = useState(false); // Default to closed for smaller screens

    useEffect(() => {
        // Update state based on media query after the component mounts
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        setIsLargeScreen(mediaQuery.matches);

        const handleResize = () => setIsLargeScreen(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.body" }}>
            {/* Navbar for Desktop */}
            {isLargeScreen && (
                <Box
                    component="nav"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        bgcolor: "background.surface",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        padding: 2,
                        position: "fixed", // Fix the navbar to the left side
                        height: "100vh", // Make it span the full height of the screen
                        overflowY: "auto", // Add scrolling if content overflows
                    }}
                >
                    <NavList />
                </Box>
            )}

            {/* Drawer for Mobile/Tablet */}
            {!isLargeScreen && (
                <>
                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={toggleDrawer}
                        variant="plain"
                        sx={{
                            "& .JoyDrawer-paper": {
                                width: 240,
                                boxSizing: "border-box",
                            },
                        }}
                    >
                        <NavList onClose={toggleDrawer} />
                    </Drawer>

                    {/* Toggle Button */}
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{
                            position: "fixed",
                            top: 16,
                            left: 16,
                            zIndex: 1300,
                            backgroundColor: "background.surface",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {isDrawerOpen ? <Close /> : <Menu />}
                    </IconButton>
                </>
            )}

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.body",
                    minHeight: "100vh",
                    marginLeft: isLargeScreen ? "240px" : 0, // Add margin for desktop navbar
                    transition: "margin-left 0.3s", // Smooth transition
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
