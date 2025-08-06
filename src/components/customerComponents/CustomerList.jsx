"use client";

import React, { useEffect, useState } from "react";

const CustomerList = ({setCustomer, updateFlag}) => {
    const [customers, setCustomers] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const getCustomers = async () => {
        try {
            const response = await fetch(`${baseUrl}/Customer`);
            const result = await response.json();
            setCustomers(result);
        } catch (error) {
            console.error("Det blev fel: ", error);
        }
    };

    const removeCustomer = async (data) => {
        const id = data.id
        console.log(id)
        try {
            const response = await fetch(`${baseUrl}/Customer/${id}`, {
                method: "DELETE"
            })
            getCustomers()
        } catch (error) {
            console.error(error);
        }
    };

    const editCustomer = (customer) => {
        setCustomer(customer)
    }

    useEffect(() => {
        getCustomers();
    }, [updateFlag]);
    return (
        <div className="w-1/3 max-h-[400px] overflow-y-auto border p-1 rounded-xl">
            <ul >
                {customers.map((customer) => (
                    <div
                        key={customer.id}
                        className="border m-1 p-2 rounded-xl flex justify-between">
                        <div className="flex flex-col">
                            <p>Kund nummer: {customer.customerNumber}</p>
                            <p>
                                {customer.customerFirstName}{" "}
                                {customer.customerLastName}
                            </p>
                            <p>{customer.customerAddressLine}</p>
                        </div>
                        <div className="grid gap-1">
                            <button className="border rounded-xl p-1" onClick={() => editCustomer(customer)}>
                                Redigera
                            </button>
                            <button
                                className="border rounded-xl p-1 bg-red-300"
                                onClick={() => removeCustomer(customer)}>
                                Radera
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
