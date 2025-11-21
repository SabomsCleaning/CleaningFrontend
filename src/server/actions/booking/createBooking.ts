'use server'

import { fetchApi } from "@/lib/api/fetch"

export async function createBooking(formData: FormData) {
    const payload = {
        customerId: formData.get("customerId"),
        serviceTypeId: Number(formData.get("serviceTypeId")),
        serviceLocationId: formData.get("serviceLocationId"),
        scheduleStartTime: new Date(formData.get("bookingStartTime") as string).toISOString(),
        scheduleEndTime: new Date(formData.get("bookingEndTime") as string).toISOString(),
        comment: formData.get("comment")
    };

    console.log("detta är i createBooking", payload)
    try {
        const result = await fetchApi("/Booking", { 
            method: "POST", 
            body: JSON.stringify(payload),
        });

        console.log("Bokning skapad: ", result);
        return { success: true};
    } catch (error) 
    { 
        console.error("Fel vid skapandet av bokning", error); 
        return {success: false, message: "Kunde inte skapa bokningen"};
    }
}