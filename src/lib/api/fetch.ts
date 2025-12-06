import { cookies } from "next/headers";

const baseUrl = process.env.API_URL;

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    //const fullUrl = `${baseUrl}${endpoint}`;
    //console.log("Anropar API:", fullUrl);

    try {
        const res = await fetch(`${baseUrl}${endpoint}`, {
            method: options.method || "GET",
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(options.headers || {}),
            },
            cache: "no-store",
        });

        if (!res.ok) {
            let message = `Fel vid API-Anrop (${res.status})`;
            try {
                const errorBody = await res.json();
                const parsedBody =
                    typeof errorBody === "string"
                        ? { message: errorBody }
                        : errorBody;
                message = parsedBody.message || message;
                //console.error(`API-fel[${res.status}]:`, parsedBody);
            } catch {
                message = await res.text();
                //const errorText = await res.text();
                //console.error(`API-fel [${res.status}]:`, errorText)
            }
            return { success: false, message };
        }
        const data = (await res.json()) as T;
        return { success: true, data };
    } catch (err) {
        console.error("fetchApi exeption", err);
        return { success: false, message: "Ett oväntat fel har inträffat" };
    }
}
