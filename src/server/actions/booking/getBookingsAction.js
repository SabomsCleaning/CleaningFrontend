'use server'
import { fetchApi } from "@/lib/api/fetch";

export async function getBookingsAction() {
    try {
        const res = await fetchApi('/booking');
        return res;
    } catch (error) {
        console.error(error)
    }
}
