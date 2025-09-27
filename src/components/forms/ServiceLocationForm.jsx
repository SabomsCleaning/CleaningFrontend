"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ServiceLocationForm = ({ service, customerId, setUpdateFlag}) => {
    const { register, handleSubmit, reset } = useForm();
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const isUpdate = !!service?.id;
    const url = isUpdate 
        ? `${baseURL}/ServiceLocation/${service.id}`
        : `${baseURL}/ServiceLocation/${customerId}`

    const saveServiceLocation = async (data) => {
        console.log(data)
        const payLoad = {
            ...data,
            customerId,
            serviceLocationId: service?.id
        };

        console.log(payLoad);
        const response = await fetch(`${url}`, {
            method: isUpdate? "PUT": "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payLoad),
        });
        setUpdateFlag((prev) => !prev)
        const result = await response.json();
        console.log(result);
    };

    const removeServiceLocation = () => {
        reset({
                addressLine: "",
                postalCode: "",
                city: "",
                description: "",
                isDefault: "",
            })
    }

    useEffect(() => {
        if (service) {
            console.log(service);
            reset({
                addressLine: service.address.addressLine,
                postalCode: service.address.postalCode,
                city: service.address.city,
                description: service.description,
                isDefault: service.isDefault,
            });
        }
    }, [service, reset]);
    return (
        <div>
            <form
                onSubmit={handleSubmit(saveServiceLocation)}
                className="flex flex-col">
                <input
                    type="text"
                    placeholder="AddressLine"
                    {...register("addressLine")}
                    className="input-glow"
                />
                <input
                    type="text"
                    placeholder="PostalCode"
                    {...register("postalCode")}
                    className="input-glow"
                />
                <input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                    className="input-glow"
                />
                <input
                    type="text"
                    placeholder="Description"
                    {...register("description")}
                    className="input-glow"
                />
                <label>
                    <input type="checkbox" {...register("isDefault")} />
                    Isdefault
                </label>
                <button type="submit" className="input-glow">
                  {service?.id ? "Uppdatera": "Spara"}  
                </button>
                <button type="button" className="input-glow" onClick={() => removeServiceLocation()}>Radera</button>
            </form>
        </div>
    );
};

export default ServiceLocationForm;
