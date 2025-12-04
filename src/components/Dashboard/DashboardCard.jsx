"use client";
import { useState } from "react";

export default function DashboardCard({ booking }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border p-3 mb-3 rounded bg-white shadow">
            {/* {grundinfo} */}
            <div
                className="cursor-pointer flex justify-between items-center"
                onClick={() => setOpen(!open)}>
                <div>
                    <p>
                        {new Date(booking.scheduleStartTime).toLocaleTimeString(
                            "se-SV",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Europe/Stockholm",
                            }
                        )}
                        {" -- "}
                        {new Date(booking.scheduleEndTime).toLocaleTimeString(
                            "se-SV",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZone: "Europe/Stockholm",
                            }
                        )}
                    </p>
                        <p>{booking.customer}</p>
                        <p>{booking.service.name}</p>
                </div>
                <span>{open ? '▲' : '▼'}</span>
            </div>
            {/* { Expanderande del} */}
            {open && (
                <div className="mt-2">
                    <p>Adress: {booking.serviceLocation}</p>
                    <p>Städare: {booking.cleaner}</p>
                    <p>{booking.cleaner == 0 ? "Ingen städare" : "städare" }</p>
                </div>
            )}
        </div>
    );
}
