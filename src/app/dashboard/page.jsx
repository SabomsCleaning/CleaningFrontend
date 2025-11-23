"use client";

import { useState, useEffect } from "react";
import { getBookings } from "@/server/actions/booking/getBookings";
import DayColumn from "@/components/Dashboard/DayColumn";

export default function DashboardPage() {
    const [bookings, setBookings] = useState([]);
    const [weekOffSet, setWeekOffSet] = useState(0);

    useEffect(() => {
        (async () => {
            const data = await getBookings();
            setBookings(data.data || []);
        })();
    }, []);

    const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];

    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + weekOffSet * 7);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const thisWeeksBookings = bookings.filter((b) => {
        const start = new Date(b.scheduleStartTime);
        return start >= monday && start <= sunday;
    });

    const date = new Date(monday);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const currentWeekNumber = Math.ceil(
        (numberOfDays + oneJan.getDay() + 1) / 7
    );

    return (
        <div className="grid gap-2">
            <div className="flex justify-around">
                <button
                    onClick={() => setWeekOffSet((prev) => prev - 1)}
                    className="border p-2 rounded">
                    {" "}
                    ← Föregående
                </button>
                <h1>Vecko vy {currentWeekNumber}</h1>
                <button
                    onClick={() => setWeekOffSet((prev) => prev + 1)}
                    className="border p-2 rounded">
                    Nästa →
                </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {days.map((day, index) => {
                    const currentDay = new Date(monday);
                    currentDay.setDate(monday.getDate() + index);

                    const dayBookings = thisWeeksBookings
                        .filter(
                            (b) =>
                                new Date(b.scheduleStartTime).getDay() ===
                                index + 1
                        )
                        .sort(
                            (a, b) =>
                                new Date(a.scheduleStartTime) -
                                new Date(b.scheduleStartTime)
                        );

                    return (
                        <DayColumn
                            key={day}
                            day={day}
                            date={currentDay}
                            bookings={dayBookings}
                        />
                    );
                })}
            </div>
        </div>
    );
}
