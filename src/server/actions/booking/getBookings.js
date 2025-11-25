'use server'

import { fetchApi} from "@/lib/api/fetch.ts"

export async function getBookings() {
    try {
        const result = await fetchApi("/Booking")
        return result.data;
    } catch (error) {
        console.error(error)
    }
}
