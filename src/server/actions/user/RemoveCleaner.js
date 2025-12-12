"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function RemoveCleaner({ bookingId, cleanerId}) {
    try {
        await fetchApi(
            `/booking/${bookingId}/cleaner/${cleanerId}`,
            { method: "DELETE" }
        );
    } catch (error) {
        console.error("Nu blev det fel", error);
    }
}
