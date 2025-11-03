"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const [bookings, setbookings] = useState([]);

    const getBookings = async () => {
        const response = await fetch(`${baseURL}/Booking`);
        const data = await response.json();
        console.log(data.data);
        setbookings(data.data);
    };

    useEffect(() => {
        getBookings();
    }, []);

    function groupByDate(bookings) {
        const groups = {};

        bookings.forEach((b) => {
            const dateKey = new Date(b.scheduleStartTime).toLocaleString(
                "sv-SE",
                {
                    weekday: "short",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }
            );

            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(b);
        });

        return groups;
    }

    const grouped = groupByDate(bookings);
    const sortedDates = Object.keys(grouped).sort((a,b) => new Date(a) - new Date(b));

    return (
        <div className="p-4 flex gap-1">
            {sortedDates.map((date) => (
                <div key={date} className="mb-6 border rounded-lg p-3 shadow-sm bg-white">
                    <h2 className="font-bold text-lg mb-2">{date}</h2>

                    {grouped[date].map((b) => (
                        <div
                            key={b.id}
                            className="border p-2 mb-2 rounded-md flex flex-col bg-gray-50"
                        >
                            <p className="font-semibold">
                                {b.bookingNumber} {b.customer}
                            </p>
                            <p>{b.service.name}</p>
                            <p>
                                P. Start:{" "}
                                {new Date(b.scheduleStartTime).toLocaleString("sv-SE", {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}
                            </p>
                            <p>
                                P. Avslut:{" "}
                                {new Date(b.scheduleEndTime).toLocaleString("sv-SE", {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
