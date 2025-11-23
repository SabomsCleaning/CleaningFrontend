"use server";

import { fetchApi } from "@/lib/api/fetch";

export async function getServiceTypes() {
    return fetchApi("/ServiceType");
}

export async function createServiceType(data) {
    console.log("From createService: ", data)
    return fetchApi("/ServiceType", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function deleteServiceType(id) {
    console.log(`api: ${id}`)
    return fetchApi(`/ServiceType?serviceTypeId=${id}`, {
        method: "DELETE",
    });
}


