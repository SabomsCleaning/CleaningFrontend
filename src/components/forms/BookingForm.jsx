"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createBooking } from "@/server/actions/booking/createBooking";

const BookingForm = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit, setValue, watch } = useForm();

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
    setServiceType(data);
  };

  const getServiceLocation = async (id) => {
    const response = await fetch(`${baseURL}/ServiceLocation/${id}`);
    const data = await response.json();
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
      // Kombinera datum + tid
      const scheduleStartTime = `${data.bookingStartDate}T${data.bookingStartTime}`;
      const scheduleEndTime = `${data.bookingEndDate}T${data.bookingEndTime}`;

      const payload = {
        customerId: data.customerId,
        serviceTypeId: Number(data.serviceTypeId),
        serviceLocationId: data.serviceLocationId,
        comment: data.comment,
        scheduleStartTime,
        scheduleEndTime,
      };

      const response = await createBooking(payload);

      if (!response.success) {
        throw new Error(response.message || "Kunde inte skapa bokningen");
      }

      alert("Bokningen är skapad!");
    } catch (err) {
      alert(err.message || "Kunde inte skapa bokningen.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Skapa bokning
        </h2>

        {/* Kund */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Kund
          </label>
          <select
            {...register("customerId", { required: true })}
            defaultValue=""
            className="w-full p-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
          >
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

        {/* Adress */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Adress
          </label>
          <select
            {...register("serviceLocationId", { required: true })}
            defaultValue=""
            disabled={!selectedCustomerId}
            className={`w-full p-2 rounded-lg border ${
              !selectedCustomerId
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500"
            }`}
          >
            <option value="" disabled hidden>
              -- Välj adress --
            </option>
            {serviceLocation.map((sl) => (
              <option key={sl.id} value={sl.id}>
                {sl.address.addressLine}
              </option>
            ))}
          </select>
        </div>

        {/* Service */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            {...register("serviceTypeId", { required: true })}
            defaultValue=""
            className="w-full p-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              -- Välj service --
            </option>
            {serviceType.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Starttid */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Start datum & tid
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* Datum */}
            <input
              type="date"
              {...register("bookingStartDate", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            {/* Tid */}
            <input
              type="time"
              step="600"
              {...register("bookingStartTime", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sluttid */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Slut datum & tid
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* Datum */}
            <input
              type="date"
              {...register("bookingEndDate", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            {/* Tid */}
            <input
              type="time"
              step="600"
              {...register("bookingEndTime", { required: true })}
              className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Kommentar */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kommentar
          </label>
          <input
            type="text"
            {...register("comment")}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Kommentar"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Spara bokning
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
