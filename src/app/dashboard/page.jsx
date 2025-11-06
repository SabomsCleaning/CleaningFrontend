"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [bookings, setBookings] = useState([]);
    const [expandedId, setExpandedId] = useState(null); // <- ny state

    const getBookings = async () => {
        const response = await fetch(`${baseURL}/Booking`);
        const data = await response.json();
        console.log(data.data);
        setBookings(data.data);
    };

    useEffect(() => {
        getBookings();
    }, []);

    useEffect(() => {
        if (!bookings.length) return;

        const hasMissingCleaners = bookings.some((b) => b.cleaners == 0);
        const faviconPaht = hasMissingCleaners
            ? "/icons/icons8-cleaning-50.png"
            : "/icons/icons8-done-50.png";
        const link =
            document.querySelector("link[rel~='icon']") ||
            document.querySelector("link");
        link.rel = "icon";
        link.href = faviconPaht;
        document.head.appendChild(link);
    }, [bookings]);

    function groupByDate(bookings) {
        const groups = {};
        bookings.forEach((b) => {
            const dateKey = new Date(b.scheduleStartTime).toLocaleDateString(
                "sv-SE",
                {
                    weekday: "short",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: "Europe/Stockholm",
                }
            );
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(b);
        });
        return groups;
    }

    const grouped = groupByDate(bookings);
    const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const toggleExpand = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="p-4">
            {sortedDates.map((date) => (
                <div
                    key={date}
                    className="mb-6 border rounded-lg p-3 shadow-sm bg-white">
                    <h2 className="font-bold text-lg mb-2">{date}</h2>

                    {grouped[date].map((b) => {
                        const isExpanded = expandedId === b.id;

                        return (
                            <div
                                key={b.id}
                                onClick={() => toggleExpand(b.id)}
                                className={`border p-2 mb-2 rounded-md transition-all cursor-pointer ${
                                    isExpanded
                                        ? "bg-purple-50"
                                        : "bg-gray-50 hover:bg-gray-100"
                                }`}>
                                {/* Basinformation */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        {b.cleaners == 0 ? (
                                            <div className="flex items-center gap-2 mb-1">
                                                <img
                                                    src="/icons/icons8-cleaning-50.png"
                                                    alt="Ingen städare"
                                                    className="w-5 h-5 opacity-100"
                                                />
                                                <span className="text-red-600 font-medium">
                                                    Ingen städare
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 mb-1">
                                                <img
                                                    src="/icons/icons8-cleaning-50.png"
                                                    alt="Städare finns"
                                                    className="w-5 h-5 opacity-60"
                                                />
                                                <span className="text-green-600 font-medium">
                                                    Städare tilldelad
                                                </span>
                                            </div>
                                        )}

                                        <p className="font-semibold">
                                            {b.bookingNumber} — {b.customer}
                                        </p>
                                        <p>{b.service.name}</p>
                                        <p>
                                            Start:{" "}
                                            {new Date(
                                                b.scheduleStartTime
                                            ).toLocaleTimeString("sv-SE", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                timeZone: "Europe/Stockholm",
                                            })}
                                            {"  "}–{" "}
                                            {new Date(
                                                b.scheduleEndTime
                                            ).toLocaleTimeString("sv-SE", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                timeZone: "Europe/Stockholm",
                                            })}
                                        </p>
                                    </div>
                                    <span className="text-xl">
                                        {isExpanded ? "▲" : "▼"}
                                    </span>
                                </div>

                                {/* Expandera mer info */}
                                {isExpanded && (
                                    <div className="mt-3 text-sm border-t pt-2 text-gray-700">
                                        {/* <p><strong>Boknings-ID:</strong> {b.id}</p> */}
                                        <p>
                                            <strong>Skapad: </strong>
                                            {b.creator}{" "}
                                            {new Date(
                                                b.createdAt
                                            ).toLocaleString("sv-SE", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                timeZone: "Europe/Stockholm",
                                            })}
                                        </p>
                                        <p>
                                            <strong>Kund:</strong> {b.customer}
                                        </p>
                                        <p>
                                            <strong>Adress:</strong>{" "}
                                            {b.serviceLocation}
                                        </p>
                                        <p>
                                            <strong>Service:</strong>{" "}
                                            {b.service.name}
                                        </p>
                                        <p>
                                            <strong>Städare:</strong>{" "}
                                            {b.cleaners[0]}
                                        </p>
                                        <p>
                                            <strong>Kommentar:</strong>{" "}
                                            {b.comment || "Ingen kommentar"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
