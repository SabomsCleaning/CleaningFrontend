"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CustomerForm = ({ customer,setCustomer, setUpdateFlag }) => {
    const { register, handleSubmit, reset } = useForm();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (customer) {
            reset(customer);
        }
    }, [customer, reset]);

    const onSubmit = async (data) => {
        const response = await fetch(`${baseUrl}/Customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setUpdateFlag((prev) => !prev);
    };

    const emptyForm = () => {
        const emptyCustomer = {
            customerId: "",
            customerNumber: "",
            customerFirstName: "",
            customerLastName: "",
            customerEmail: "",
            customerPhoneNumber: "",
            customerAddressLine: "",
            customerCity: "",
            customerPostalCode: "",
        };
        reset(emptyCustomer);
        setCustomer(null);
    };
    return (
        <div className="w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerFirstName")}
                    placeholder="Förnamn"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerLastName")}
                    placeholder="Efternamn"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerEmail")}
                    placeholder="Email"
                />
                <input
                    className="input-glow"
                    type="text"
                    {...register("customerPhoneNumber")}
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
                    {customer?.id ? "Uppdatera" : "Spara"}
                </button>
            <button
            type="button"
                onClick={() => {
                    emptyForm();
                }}>
                Töm formulär
            </button>
            </form>
        </div>
    );
};

export default CustomerForm;
