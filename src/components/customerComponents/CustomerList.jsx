"use client";

import { useEffect, useState } from "react";

export default function CustomerListTable({ setCustomer, updateFlag }) {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const getCustomers = async () => {
    try {
      const response = await fetch(`${baseUrl}/Customer`);
      if (!response.ok) {
        const errorText = await response.text();
        setCustomers([]);
        setMessage(errorText || "Kunde inte hämta kunder just nu");
        return;
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setCustomers(data);
        setMessage("");
      } else {
        setCustomers([]);
        setMessage("Det finns inga kunder i databasen");
      }
    } catch (err) {
      console.error(err);
      setMessage("Kunde inte hämta kunder just nu");
    }
  };

  const removeCustomer = async (customer) => {
    try {
      await fetch(`${baseUrl}/Customer/${customer.id}`, { method: "DELETE" });
      getCustomers();
      setCustomer(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCustomers();
  }, [updateFlag]);

  return (
    <div className="max-h-[600px] overflow-y-auto bg-white rounded-xl shadow-md border border-gray-200 p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Kunder</h3>

      {message ? (
        <p className="text-gray-600">{message}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left p-2 border-b font-medium text-gray-700">Kundnr</th>
              <th className="text-left p-2 border-b font-medium text-gray-700">Namn</th>
              <th className="text-left p-2 border-b font-medium text-gray-700">Adress</th>
              <th className="text-left p-2 border-b font-medium text-gray-700 w-32">Åtgärder</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="p-2 border-b">{customer.customerNumber}</td>
                <td className="p-2 border-b">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="p-2 border-b">{customer.visitAddressLine}</td>

                <td className="p-2 border-b flex gap-2">
                  <button
                    onClick={() => setCustomer(customer)}
                    className="px-2 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
                  >
                    Redigera
                  </button>

                  <button
                    onClick={() => removeCustomer(customer)}
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
