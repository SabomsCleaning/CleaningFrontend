"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function AssignUser(payload) {
  console.log("assignCleaner payload:", payload);

  const { bookingId, cleanerId } = payload;

  try {
    const result = await fetchApi(
      `/Cleaner?bookingId=${bookingId}&cleanerId=${cleanerId}`,
      {
        method: "POST",
      }
    );

    console.log("Cleaner tilldelad: ", result);
    return { success: true };
  } catch (error) {
    console.error("Fel vid tilldelning av cleaner", error);
    return { success: false, message: "Kunde inte tilldela cleaner" };
  }
}
