"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function AssignUser(payload) {
  console.log("assignCleaner payload:", payload);

  try {
    const result = await fetchApi(
      `/Cleaner`,
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

    console.log("Cleaner tilldelad: ", result);
    return { success: true, message: "Städaren är tilldelad till bokningen" };
  } catch (error) {
    console.error("Fel vid tilldelning av cleaner", error);
    return { success: false, message: "Kunde inte tilldela cleaner" };
  }
}
