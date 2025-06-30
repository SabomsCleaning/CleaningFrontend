"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "https://sabomscleaning-dpegfqarf4dxavcc.swedencentral-01.azurewebsites.net/api/Auth",
                {
                    email,
                    password,
                }
            );
            if (response.status === 200 && response.data.token) {
                Cookies.set("token", response.data.token, {
                    secure: true,
                    sameSite: "Lax",
                });
                Cookies.set("role", response.data.role, {
                    secure: true,
                    sameSite: "Lax",
                });
                Cookies.set("department", response.data.department, {
                    secure: true,
                    sameSite: "Lax",
                });

                router.push("/dashboard");
            } else {
                setError("Felaktigt svar från servern");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error(
                    "Login failed",
                    err.response?.data || err.message
                );
            } else {
                console.error("Unexpected error", err);
            }
            setError(
                "Inloggningen misslyckades, vänligen kontrollera dina uppgifter"
            );
        }
    };
    return (
        <div>
            <div className="p-3 bg-purple-400 flex justify-center align-middle">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <h2>Logga in</h2>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border-1 rounded-md p-1"
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white border-1 rounded-md p-1"
                    />
                    <button
                        type="submit"
                        className="bg-purple-700 text-white rounded-md py-2 font-bold">
                        Logga in
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
