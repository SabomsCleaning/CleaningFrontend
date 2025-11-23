'use server'

import { fetchApi} from "@/lib/api/fetch.ts"

export async function getBookings() {
    try {
        const res = await fetchApi("/booking")
        //console.log(res)
        return res;
    } catch (error) {
        console.error(error)
    }
}
