"use client";

import React, { useEffect, useState } from "react";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    const getCustomers = async () => {
        try {
            const response = await fetch("https://localhost:7276/api/Customer");
            const result = await response.json();
            setCustomers(result);
            console.log(result);
        } catch (error) {
            console.error("Det blev fel: ", error);
        }
    };

    const removeCustomer = async (data) => {
        const id = data.id
        console.log(id)
        try {
            const response = await fetch(`https://localhost:7276/api/Customer/${id}`, {
                method: "DELETE"
            })
            getCustomers()
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);
    return (
        <div>
            <ul>
                {customers.map((customer) => (
                    <div
                        key={customer.id}
                        className="border m-1 p-2 rounded-xl w-1/3 flex justify-between">
                        <div className="flex flex-col">
                            <p>Kund nummer: {customer.customerNumber}</p>
                            <p>
                                {customer.customerFirstName}{" "}
                                {customer.customerLastName}
                            </p>
                            <p>{customer.customerAddressLine}</p>
                        </div>
                        <div className="grid gap-1">
                            <button className="border rounded-xl p-1">
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
