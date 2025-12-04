import { useEffect, useState } from "react";
import Modal from "@/components/dashboard/Modal";

export default function DayColumnChangeName({ day, date, bookings }) {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => setIsMounted(true), []);
    const isToday = date.toDateString() === new Date().toDateString();

    if (!isMounted) {
        return (
            <div
                className={`border rounded-lg p-2 min-h-[400px] ${
                    isToday ? "bg-yellow-50 border-yellow-400" : "bg-gray-50"
                }`}>
                <h2>{day}</h2>
                <p className="text-gray-400 italic">Laddar datum...</p>
            </div>
        );
    }

    return (
        <>
            {/* Själva dag-kolumnen */}
            <div
                className={`border rounded-lg p-2 min-h-[400px] ${
                    isToday ? "bg-yellow-50 border-yellow-400" : "bg-gray-50"
                }`}>
                <h2>{day}</h2>
                <p>
                    {date.toLocaleDateString("sv-SE", {
                        weekday: "short",
                        day: "2-digit",
                        month: "2-digit",
                    })}
                </p>

                {bookings.length === 0 ? (
                    <p className="text-gray-500 text-sm">Inga bokningar</p>
                ) : (
                    bookings.map((b) => (
                        <div
                            key={b.id}
                            onClick={() => setSelectedBooking(b)}
                            className="cursor-pointer border rounded p-2 my-1 hover:bg-blue-50">
                            <p className="font-medium">{b.customer}</p>
                            <p className="text-sm text-gray-700">
                                {new Date(
                                    b.scheduleStartTime
                                ).toLocaleTimeString("sv-SE", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Europe/Stockholm",
                                })}{" "}
                                —{" "}
                                {new Date(b.scheduleEndTime).toLocaleTimeString(
                                    "sv-SE",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Europe/Stockholm",
                                    }
                                )}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* 👇 Modal visas bara om något är valt */}
            {selectedBooking && (
                <Modal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </>
    );
}
