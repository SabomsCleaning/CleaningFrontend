import { fetchApi } from "./fetch"; // anpassa pathen

export interface Customer {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerAddressLine: string;
  customerPostalCode: string;
  customerCity: string;
  customerNumber: Int16Array;
}

export async function getCustomers(): Promise<Customer[]> {
  return fetchApi<Customer[]>("Customer");
}