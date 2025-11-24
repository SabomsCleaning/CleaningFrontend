"use client";

import React, { useEffect, useState } from "react";
import ServiceLocationForm from "@/components/forms/ServiceLocationForm";

/* --- Ny Tabellkomponent direkt på sidan --- */
function ServiceLocationTable({
  serviceLocations,
  handleServiceLocation,
  removeServiceLocation,
}) {
  return (
    <div className="max-h-[600px] overflow-y-auto bg-white rounded-xl shadow-md border border-gray-200 p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Serviceadresser
      </h3>

      {(!serviceLocations || serviceLocations.length === 0) && (
        <p className="text-gray-600">Ingen adress hittades.</p>
      )}

      {serviceLocations?.length > 0 && (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left p-2 border-b font-medium text-gray-700">
                Adress
              </th>
              <th className="text-left p-2 border-b font-medium text-gray-700">
                Stad
              </th>
              <th className="text-left p-2 border-b font-medium text-gray-700">
                Beskrivning
              </th>
              <th className="text-left p-2 border-b font-medium text-gray-700">
                Default
              </th>
              <th className="text-left p-2 border-b font-medium text-gray-700 w-32">
                Åtgärder
              </th>
            </tr>
          </thead>

          <tbody>
            {serviceLocations.map((loc) => (
              <tr key={loc.id} className="hover:bg-gray-50 transition">
                <td className="p-2 border-b">{loc.address.addressLine}</td>
                <td className="p-2 border-b">{loc.address.city}</td>
                <td className="p-2 border-b">{loc.description || "-"}</td>

                <td
                  className={`p-2 border-b font-medium ${
                    loc.isDefault ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {loc.isDefault ? "Ja" : "Nej"}
                </td>

                <td className="p-2 border-b flex gap-2">
                  <button
                    onClick={() => handleServiceLocation(loc)}
                    className="px-2 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
                  >
                    Redigera
                  </button>

                  <button
                    onClick={() => removeServiceLocation(loc.id)}
                    className="px-2 py-1 rounded-lg bg-red-400 hover:bg-red-500 text-white text-sm transition"
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* --- Hela sidan --- */
export default function ServiceLocation() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [customers, setCustomers] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  /* --- Hämta kunder --- */
  const getCustomers = async () => {
    const response = await fetch(`${baseURL}/Customer`);
    const data = await response.json();
    setCustomers(data);
  };

  /* --- Trigger när man väljer kund --- */
  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  /* --- Hämta kundens service locations --- */
  const getServiceLocation = async (customerId) => {
    if (!customerId) return;

    const response = await fetch(`${baseURL}/ServiceLocation/${customerId}`);
    const data = await response.json();

    setServiceLocations(data);
  };

  /* --- Öppna adress i edit mode --- */
  const handleServiceLocation = (service) => {
    setSelectedService(service);
  };

  /* --- Ta bort adress --- */
  const removeServiceLocation = async (serviceId) => {
    await fetch(`${baseURL}/ServiceLocation/${serviceId}`, {
      method: "DELETE",
    });

    getServiceLocation(selectedCustomerId);
  };

  /* --- useEffect för laddning + uppdatering --- */
  useEffect(() => {
    getCustomers();
    if (selectedCustomerId) {
      getServiceLocation(selectedCustomerId);
    }
  }, [updateFlag, selectedCustomerId]); // ← KORREKT!

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

      {/* --- Vänster sida: Kund & Adresser --- */}
      <div>
        {/* Välj kund */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Kund</h2>

          <select
  onChange={(e) => handleSelectCustomer(e.target.value)}
  className="
    w-full p-3 rounded-lg border border-gray-300 bg-white 
    shadow-sm text-gray-800
    focus:outline-none focus:ring-2 focus:ring-blue-500
    hover:bg-gray-50 transition
  "
>

            <option value="">-- Välj kund --</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Adresslista */}
        <ServiceLocationTable
          serviceLocations={serviceLocations}
          handleServiceLocation={handleServiceLocation}
          removeServiceLocation={removeServiceLocation}
        />
      </div>

      {/* --- Höger sida: Formuläret --- */}
      <ServiceLocationForm
        service={selectedService}
        customerId={selectedCustomerId}
        setUpdateFlag={setUpdateFlag}
      />
    </div>
  );
}
