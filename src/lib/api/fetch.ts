import { cookies } from "next/headers";

const baseUrl = process.env.API_URL;

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const fullUrl = `${baseUrl}${endpoint}`;
    console.log("Anropar API:", fullUrl);

    const res = await fetch(`${baseUrl}${endpoint}`, {
        method: options.method || "GET",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {})
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error(`API-fel[${res.status}]:`, errorBody);
        throw new Error(`Fel vid API-anrop (${res.status})`);
    }
    return res.json() as Promise<T>;
}
