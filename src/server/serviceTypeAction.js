'use server'

import { deleteServiceType } from "@/server/serviceTypeApi";

export async function deleteServiceTypeAction(id) {
    console.log("server action körs med id:", id)
    try {
        await deleteServiceType(id);
    } catch (error)
    {
        console.error("Fel i server: ", error)
        throw error
    }
}