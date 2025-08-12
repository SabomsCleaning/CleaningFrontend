"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CustomerForm = ({ customer, setCustomer, setUpdateFlag }) => {
    const { register, handleSubmit, reset, watch } = useForm();
    const invoiceSameAsVisit = watch("InvoiceSameAsVisit", false);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (customer) {
            reset(customer);
        }
    }, [customer, reset]);

    const onSubmit = async (data) => {
        console.log(data);
        const response = await fetch(`${baseUrl}/Customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        // just for update in customerList
        emptyForm()
        setUpdateFlag((prev) => !prev);
    };

    const emptyForm = () => {
        console.log("töm formulär")
        const emptyCustomer = {
            id: "",
            number: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            visitAddressLine: "",
            visitCity: "",
            visitPostalCode: "",
            invoiceAddressLine: "",
            invoiceCity: "",
            invoicePostalCode: "",
            description: "",
        };
        reset(emptyCustomer);
        setCustomer(null);
    };

    return (
        <div className="w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex">
                    <input
                        className="input-glow w-full"
                        type="text"
                        {...register("firstName")}
                        placeholder="Förnamn"
                    />
                    <input
                        className="input-glow w-full"
                        type="text"
                        {...register("lastName")}
                        placeholder="Efternamn"
                    />
                </div>
                <div className="flex">
                    <input
                        className="input-glow w-full"
                        type="text"
                        {...register("email")}
                        placeholder="Email"
                    />
                    <input
                        className="input-glow w-full"
                        type="text"
                        {...register("phoneNumber")}
                        placeholder="Telefon nummer"
                    />
                </div>
                <input
                    className="input-glow w-auto"
                    type="text"
                    {...register("visitAddressLine")}
                    placeholder="Address"
                />
                <div className="flex">
                    <input
                        className="input-glow w-full"
                        type="text"
                        {...register("visitPostalCode")}
                        placeholder="Postnummer"
                    />
                    <input
                        className="input-glow w-full"
                        type="text"
                        {...register("visitCity")}
                        placeholder="Stad"
                    />
                </div>
                <textarea
                    className="input-glow"
                    placeholder="Övrig info"
                    {...register("description", {})}
                />
                <label>
                    <input
                        type="checkbox"
                        {...register("invoiceSameAsVisit")}
                        className="m-1 gap-2"
                    />
                    FakturaAddress samma som besöksadress
                </label>
                <label>
                    <input
                        type="checkbox"
                        {...register("addVisitAsServiceLocation")}
                        className="m-1 gap-2"
                    />
                    Tjänsteplats samma som besöksadress
                </label>
                {!invoiceSameAsVisit && (
                    <div>
                        <input
                            type="text"
                            {...register("invoiceAddressLine")}
                            placeholder="Faktura address"
                            className="input-glow"
                        />
                        <div className="flex">
                            <input
                                type="text"
                                {...register("invoiceCity")}
                                placeholder="Stad"
                                className="input-glow"
                            />
                            <input
                                type="text"
                                {...register("invoicePostalCode")}
                                placeholder="Postkod"
                                className="input-glow"
                            />
                        </div>
                    </div>
                )}
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
