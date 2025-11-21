"use server";
import { fetchApi } from "@/lib/api/fetch";

export async function getUsers() {
  try {
    const res = await fetchApi("/serviceType");
    return res;
  } catch (error) {
    console.error(error);
  }
}
