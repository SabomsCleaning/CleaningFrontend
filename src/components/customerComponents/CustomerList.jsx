"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const CustomerList = ({ setCustomer, updateFlag }) => {
    const [customers, setCustomers] = useState([]);
    const [message, setMessage]= useState("");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const getCustomers = async () => {
        try {
            const response = await fetch(`${baseUrl}/Customer`);
            if (!response.ok){
                const errorText = await response.text();
                setCustomers([])
                setMessage(errorText || "Kunde inte hämta kunder just nu");
                return;
            }
            
            const result = await response.json();

            if (Array.isArray(result) && result.length > 0) {
                setCustomers(result);
                setMessage("");
            } else {
                setCustomers([]);
                setMessage("Det finns inga kunder i databasen");
            }
        } catch (error) {
            console.error("Det blev fel: ", error);
            setCustomers([]);
            setMessage("Kunde inte hämta kunder just nu");
        }
    };

    const removeCustomer = async (data) => {
        const id = data.id;
        console.log(id);
        try {
            const response = await fetch(`${baseUrl}/Customer/${id}`, {
                method: "DELETE",
            });
            getCustomers();
            setCustomer(null);
        } catch (error) {
            console.error(error);
        }
    };

    const editCustomer = (customer) => {
        console.log(customer);
        setCustomer(customer);
    };

    useEffect(() => {
        getCustomers();
    }, [updateFlag]);

    return (
        <div className="max-h-[400px] overflow-y-auto rounded-xl">
            {message ? (
                <p>{message}</p>
            ) : (

                
                <ul>
                {customers.map((customer) => (
                    <div
                    key={customer.id}
                    className="border m-1 p-2 rounded-xl flex justify-between gap-2">
                        <div className="flex flex-col">
                            <p>Kund nummer: {customer.customerNumber}</p>
                            <p>
                                {customer.firstName} {customer.lastName}
                            </p>
                            <p>{customer.visitAddressLine}</p>
                        </div>
                        <div className="grid gap-1">
                            <button
                                className="border rounded-xl p-1"
                                onClick={() => editCustomer(customer)}>
                                Redigera
                            </button>
                            <button
                                className="border rounded-xl p-1 bg-red-300"
                                onClick={() => removeCustomer(customer)}>
                                Radera
                            </button>
                            <Link
                                href={`/customer/${customer.id}/service-locations`}>
                                <button>Service Locations</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </ul>
            )}
        </div>
    );
};

export default CustomerList;
