"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function createBooking(payload) {
  //console.log("detta är i createBooking", payload);
  try {
    const result = await fetchApi("/Booking", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    console.log("Bokning skapad: ", result);
    return { success: true };
  } catch (error) {
    console.error("Fel vid skapandet av bokning", error);
    return { success: false, message: "Kunde inte skapa bokningen" };
  }
}
