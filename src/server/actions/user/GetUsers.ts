"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function GetUsers() {
    try {
        const result = await fetchApi("/User", { method: "GET" });
        return { success: true, data: result.data };
    } catch (error) {
        console.error("Fel vid hämtning av användare", error);
        return { success: false, message: "Kunde inte leverera användare" };
    }
}
