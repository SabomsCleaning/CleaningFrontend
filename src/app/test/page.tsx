"use client";

import { useState } from "react";
import ServiceTypeSelect from "@/components/ServiceTypeSelect";
import { ServiceType } from "../../../lib/api/serviceTypes";

export default function BokningPage() {
    const [selected, setSelected] = useState<ServiceType | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) {
            alert("Välj en tjänst!");
            return;
        }

        console.log("Skickar bokning med tjänst:", selected);
        // TODO: skicka till din POST-endpoint
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 bg-white rounded shadow">
            <h1 className="text-xl font-semibold">Boka tjänst</h1>
            <ServiceTypeSelect onSelect={setSelected} />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded">
                Skicka
            </button>
        </form>
    );
}
