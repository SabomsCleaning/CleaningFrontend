"use client";
import { GetUsers } from "@/server/actions/user/GetUsers";
import { AssignUser } from "@/server/actions/user/AssignUserToBooking";
import { useEffect, useState } from "react";

export default function Modal({ booking, onClose }) {
  const [cleaners, setCleaners] = useState([]);
  const [selectedCleaner, setSelectedCleaner] = useState("");

  // Escape stänger modalen
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!booking) return null;

  // Hämta cleaners
  useEffect(() => {
    (async () => {
      const data = await GetUsers();
      setCleaners(data.data);
    })();
  }, []);

  // Tilldela vald cleaner
  const handleAssign = async () => {
    if (!selectedCleaner) {
      alert("Välj en cleaner först!");
      return;
    }

    const res = await AssignUser({
      bookingId: booking.id,
      cleanerId: selectedCleaner,
    });
    if (res.success) {
      const cleanerObject = cleaners.find(c => c.id === selectedCleaner);
    const fullName = `${cleanerObject.firstName} ${cleanerObject.lastName}`;

    // 👉 Uppdatera modalen direkt
    booking.cleaners.push(fullName);

    // 👈 Trigga re-render
    setSelectedCleaner("");      
    } else {
      alert("Kunde inte tilldela cleaner.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-2">Bokning – {booking.customer}</h2>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Bokningsnummer:</span>{" "}
          {booking.bookingNumber}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Datum:</span>{" "}
          {new Date(booking.scheduleStartTime).toLocaleDateString("sv-SE")}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Tid:</span>{" "}
          {new Date(booking.scheduleStartTime).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          –{" "}
          {new Date(booking.scheduleEndTime).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Adress:</span>{" "}
          {booking.serviceLocation || "Ingen adress"}
        </p>


        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Städare: </span>{" "}
          {booking.cleaners.join(", ")}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold">Kommentar:</span>{" "}
          {booking.comment || "Ingen kommentar"}
        </p>
        {/* Cleaner-selecten du nämnde */}
        <select
          className="border rounded px-2 py-1 w-full mb-3"
          value={selectedCleaner}
          onChange={(e) => setSelectedCleaner(e.target.value)}
        >
          <option value="">Välj städare...</option>
          {cleaners.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAssign}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Tilldela cleaner
          </button>

          <button
            onClick={onClose}
            className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-100"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
}
