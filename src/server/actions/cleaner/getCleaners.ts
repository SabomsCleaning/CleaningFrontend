"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function getCleaners() {
    try {
        const result = await fetchApi("/User", { method: "GET" });
        console.log("Användare hittad", result);
        return { success: true, data: result };
    } catch (error) {
        console.error("Fel vid hämtning av användare", error);
        return { success: false, message: "Kunde inte leverera användare" };
    }
}
