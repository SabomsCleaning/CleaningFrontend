import { fetchApi } from "./fetch";

export type ServiceType = {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    pricingModel: number;
    minimumPrice: number;
};

export async function getServiceTypes(): Promise<ServiceType[]> {
    return await fetchApi<ServiceType[]>("ServiceType");
}
