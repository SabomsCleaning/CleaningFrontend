"use server";

import { fetchApi } from "../../../lib/api/fetch";

export async function deleteCustomerAction(customerId) {
    const result = await fetchApi(`/Customer/${customerId}`, {
        method: "Delete",
    });
    return result;
}
