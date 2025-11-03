"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const BookingForm = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const { register, handleSubmit, watch } = useForm();

    const [customers, setCustomers] = useState([]);
    const [serviceType, setServiceType] = useState([]);
    const [serviceLocation, setServiceLocation] = useState([]);
    const selectedCustomerId = watch("customerId");

    const getCustomers = async () => {
        const response = await fetch(`${baseURL}/Customer`);
        const data = await response.json();
        setCustomers(data);
    };

    const getServiceType = async () => {
        const response = await fetch(`${baseURL}/ServiceType`);
        const data = await response.json();
        console.log(data);
        setServiceType(data);
    };

    const getServiceLocation = async (selectedCustomerId) => {
        const response = await fetch(
            `${baseURL}/ServiceLocation/${selectedCustomerId}`
        );
        const data = await response.json();
        console.log(data);
        setServiceLocation(data);
    };

    useEffect(() => {
        getCustomers();
        getServiceType();
    }, []);

    useEffect(() => {
        if (selectedCustomerId) {
            getServiceLocation(selectedCustomerId);
        }
    }, [selectedCustomerId]);

    const onSubmit = async (data) => {
        try {
            // Bygg upp rätt format till backend
            const payload = {
                customerId: data.customerId,
                serviceTypeId: Number(data.serviceTypeId),
                serviceLocationId: data.serviceLocationId,
                scheduleStartTime: new Date(data.bookingStartTime).toISOString(),
                scheduleEndTime: new Date(data.bookingEndTime).toISOString(),
            };

            console.log("Skickar booking:", payload);

            // Gör POST-anropet
            const response = await fetch(`${baseURL}/Booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(
                    `Servern svarade med felkod ${response.status}`
                );
            }

            const result = await response.json();
            console.log("Booking skapad:", result);

            alert("Bokningen är skapad!");
        } catch (err) {
            console.error("Fel vid skapande av bokning:", err);
            alert("Kunde inte skapa bokningen, försök igen.");
            // Test
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <select {...register("customerId", { required: true })}>
                        <option value="" disabled hidden>
                            -- Välj en kund --
                        </option>
                        {customers.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.firstName} {t.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        {...register("serviceLocationId", { required: true })}>
                        <option value="">
                            -- Vänligen välj rätt address --
                        </option>
                        {serviceLocation.map((sl) => (
                            <option key={sl.id} value={sl.id}>
                                {sl.address.addressLine}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        {...register("serviceTypeId", {
                            required: true,
                        })}>
                        <option value="" disabled hidden>
                            -- Välj en service --
                        </option>
                        {serviceType.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="bookingTime">Start datum </label>
                    <input
                        type="datetime-local"
                        id="bookingTime"
                        {...register("bookingStartTime", { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="bookingTime">Slut tiden datum </label>
                    <input
                        type="datetime-local"
                        id="bookingTime"
                        {...register("bookingEndTime", { required: true })}
                    />
                </div>

                <button type="submit" className="border-1 p-2 rounded-xl">
                    Spara bokning
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
