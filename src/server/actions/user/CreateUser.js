"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function CreateUser(payload) {
    try {
        const result = await fetchApi("/User", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        console.log("Användare är skapad", result);
        return { success: true };
    } catch (error) {
        console.error("Fel vid skapande av användare", error);
        return { success: false, message: "Kunde inte skapa en användare" };
    }
}
