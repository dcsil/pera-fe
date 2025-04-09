import { BACKEND } from "@/lib/urls";
import { fetchAuth } from "./auth";

interface RequestPayload {
    text: string;
    title: string;
    language: string;
    difficulty: string;
    exercise_mode: string;
    content_mode: string;
}

export async function sendImportData(payload: RequestPayload): Promise<Response> {
    const response = await fetchAuth(`${BACKEND}/texts/parse-text/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response?.ok) {
        throw new Error("Failed to send import data");
    }

    return response;
}

export async function sendGenerateData(payload: RequestPayload): Promise<Response> {
    const response = await fetchAuth(`${BACKEND}/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response?.ok) {
        throw new Error("Failed to send generate data");
    }

    return response;
}

export function getLanguageFromCookies(): string {
    const match = document.cookie.match(/(?:^|; )locale=([^;]*)/);
    console.log("Language cookie:", match ? decodeURIComponent(match[1]) : "en");
    return match ? decodeURIComponent(match[1]) : "en"; // Default to "en" if no language cookie is found
}
