"use client";
import React from "react";
import { useForm } from "react-hook-form";

const CustomerForm = () => {
    const { register, handleSubmit, reset } = useForm();

    const getCustomer = async () => {
        const response = await fetch("https://localhost:7276/api/Customer");
        const result = await response.json();
        console.log(result);
    };

    const onSubmit = async (data) => {
        console.log(data);
        const response = await fetch("https://localhost:7276/api/Customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-1/2">
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerFirstName")}
                    placeholder="Förnamn"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("CustomerLastName")}
                    placeholder="Efternamn"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("CustomerEmail")}
                    placeholder="Email"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("CustomerPhoneNumber")}
                    placeholder="Telefon nummer"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerAddressLine")}
                    placeholder="Address"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerPostalCode")}
                    placeholder="Postnummer"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerCity")}
                    placeholder="Stad"
                />
                <button type="submit" className="border-1 rounded-xl p-2 m-1">
                    Spara
                </button>
            </form>
            <button
                onClick={() => getCustomer()}
                className="border-1 p-2 m-1 rounded-xl">
                hämta lista
            </button>
        </div>
    );
};

export default CustomerForm;
