'use server'

import { fetchApi } from "@/lib/api/fetch"

export type ServiceTypeDto = {
    id: string;
    name: string;
};

export async function getServiceTypes() {
    return fetchApi<ServiceTypeDto[]>("/ServiceType")
}
