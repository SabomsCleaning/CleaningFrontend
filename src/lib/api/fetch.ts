import { cookies } from "next/headers";

// TODO: Denna får absolut inte vara på detta sätt när vi kör igång seriöst
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const baseUrl = process.env.API_URL;

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const cookieHeader = (await cookies()).toString();

    const fullUrl = `${baseUrl}${endpoint}`;
    console.log("Anropar API:", fullUrl);

    const res = await fetch(`${baseUrl}${endpoint}`, {
        method: options.method || "GET",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
            Cookie: cookieHeader,
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
