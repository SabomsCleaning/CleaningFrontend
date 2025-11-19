"use client";
import { useEffect } from "react";

export default function Modal({ booking, onClose }) {
    // ✅ Stäng modalen när man trycker på Escape
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!booking) return null; // ingen bokning vald

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl">
                    ×
                </button>

                <h2 className="text-xl font-bold mb-2">
                    Bokning – {booking.customer}
                </h2>

                <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Bokningsnummer:</span>{" "}
                    {booking.bookingNumber}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Datum:</span>{" "}
                    {new Date(booking.scheduleStartTime).toLocaleDateString(
                        "sv-SE"
                    )}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Tid:</span>{" "}
                    {new Date(booking.scheduleStartTime).toLocaleTimeString(
                        "sv-SE",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )}{" "}
                    –{" "}
                    {new Date(booking.scheduleEndTime).toLocaleTimeString(
                        "sv-SE",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Adress:</span>{" "}
                    {booking.addressLine || "Ingen adress"}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Kommentar:</span>{" "}
                    {booking.comment || "Ingen kommentar"}
                </p>

                {/* Här kan du senare lägga till knappar */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-100">
                        Stäng
                    </button>
                </div>
            </div>
        </div>
    );
}
