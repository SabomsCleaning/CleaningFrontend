"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ServiceLocationForm = ({ service, customerId, setUpdateFlag }) => {
  const { register, handleSubmit, reset } = useForm();

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const isUpdate = !!service?.id;

  const url = isUpdate
    ? `${baseURL}/ServiceLocation/${service.id}`
    : `${baseURL}/ServiceLocation/${customerId}`;

  const saveServiceLocation = async (data) => {
    const payload = {
      ...data,
      customerId,
      serviceLocationId: service?.id,
    };

    try {
      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      await response.json();
      setUpdateFlag((prev) => !prev);
      reset();
    } catch (err) {
      console.error("Fel vid sparande:", err);
    }
  };

  const emptyForm = () => {
    reset({
      addressLine: "",
      postalCode: "",
      city: "",
      description: "",
      isDefault: false,
    });
  };

  useEffect(() => {
    if (service) {
      reset({
        addressLine: service.address.addressLine,
        postalCode: service.address.postalCode,
        city: service.address.city,
        description: service.description,
        isDefault: service.isDefault,
      });
    }
  }, [service]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <form
        onSubmit={handleSubmit(saveServiceLocation)}
        className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          {isUpdate ? "Redigera adress" : "Ny serviceadress"}
        </h2>

        {/* 2 kolumn layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AddressLine */}
          <div className="space-y-1 col-span-2">
            <label className="text-sm font-medium text-gray-700">Adress</label>
            <input
              type="text"
              placeholder="Adress"
              {...register("addressLine")}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Postnummer</label>
            <input
              type="text"
              placeholder="Postnummer"
              {...register("postalCode")}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Stad</label>
            <input
              type="text"
              placeholder="Stad"
              {...register("city")}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Beskrivning</label>
          <input
            type="text"
            placeholder="Beskrivning"
            {...register("description")}
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div>

        {/* Default checkbox */}
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            {...register("isDefault")}
            className="h-4 w-4"
          />
          Sätt som standardadress
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          {isUpdate ? "Uppdatera" : "Spara"}
        </button>

        {/* Clear button */}
        <button
          type="button"
          onClick={emptyForm}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition"
        >
          Töm formulär
        </button>
      </form>
    </div>
  );
};

export default ServiceLocationForm;
