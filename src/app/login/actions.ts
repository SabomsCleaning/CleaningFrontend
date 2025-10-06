"use server";

import https from 'https'
import axios from "axios";
import { cookies } from "next/headers";
import type { LoginResult } from "@/types/loginResult";

export async function loginUser(formData: FormData): Promise<LoginResult> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("URL:", process.env.API_URL);

    // Denna används för att jag skall kunna köra den utan ett självstängande certifikat
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    })

    try {
        const response = await axios.post(
            //"https://sabomscleaning-dpegfqarf4dxavcc.swedencentral-01.azurewebsites.net/api/Auth",
            `${process.env.API_URL}/Auth`,
            { email, password }, {httpsAgent}
        );

        const { token, role, department } = response.data;
        const cookieStore = cookies();
        (await cookieStore).set("token", token, {
            secure: true,
            sameSite: "lax",
        });
        (await cookieStore).set("role", role, {
            secure: true,
            sameSite: "lax",
        });
        (await cookieStore).set("department", department, {
            secure: true,
            sameSite: "lax",
        });
        return { success: true };
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error("Login error:", err.response?.data || err.message);
        } else {
            console.error("Unexpected error", err);
        }

        return {
            success: false,
            message: "Felaktigt användarnamn eller lösenord",
        };
    }
}
