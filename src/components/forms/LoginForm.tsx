"use client";

import { useState } from "react";
import type { LoginResult } from "@/types/loginResult";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm({
    action,
}: {
    action: (formData: FormData) => Promise<LoginResult>;
}) {
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <form
            action={async (formData) => {
                const result = await action(formData);
                if (!result.success) {
                    setError(result.message || "Inloggning misslyckades");
                } else {
                    window.location.href = "/dashboard";
                }
            }}
            className="flex flex-col gap-2">
            <h2>Logga in</h2>
            <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="bg-white p-1 rounded"
            />
            <div className="relative">
                <input
                    name="password"
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    required
                    className="bg-white p-1 pr-10 rounded w-full"
                />
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    aria-label={visible ? "Dölj lösenord" : "Visa lösenord"}>
                    {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <button
                type="submit"
                className="bg-purple-700 border-2 border-purple-700 text-white rounded-md py-2 font-bold hover:border-purple-900 hover:bg-purple-600">
                Logga in
            </button>
            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
        </form>
    );
}
