"use client";
import { getBookingsAction } from "@/server/actions/booking/getBookingsAction";
import { useState } from "react";

export default function DashboardPage() {
  const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"];
  const [currentWeek, setCurrentWeek] = useState(0);

  function increaseWeek() {
    setCurrentWeek((prev) => prev + 1);
  }

  function decreaseWeek() {
    setCurrentWeek((prev) => prev - 1);
  }

  const today = new Date();
  const dayNumber = today.getDay();
  const diffToMonday = dayNumber === 0 ? -6 : 1 - dayNumber;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  console.log(monday);

  return (
    <div>
      <div className="flex justify-between m-1">
        <button
          onClick={() => {
            decreaseWeek();
          }}
          className="border p-1 rounded"
        >
          Förra veckan
        </button>
        <h1 className="font-bold text-xl">Vecko Vy {currentWeek}</h1>
        <button
          onClick={() => {
            increaseWeek();
          }}
          className="border p-1 rounded"
        >
          Nästa vecka
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {days.map((day, index) => {
            const currentDay = new Date(monday)
            currentDay.setDate(monday.getDate()+ index)

            return (
                <div>
                    <h2>{day}</h2>
                    <p>{currentDay.toLocaleDateString("sv-SE")}</p>
                </div>
            )
        })}
      </div>
    </div>
  );
}
