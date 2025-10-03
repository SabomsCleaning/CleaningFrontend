'use client'
import React from "react";
import { useForm } from "react-hook-form";

const ServiceTypeForm = () => {
    const { register, handleSubmit } = useForm();

    const pricingModels = [
        { value: 0, label: "Per timme" },
        { value: 1, label: "Per kvadratmeter" },
        { value: 2, label: "Per kvadratmeter (minimum)" },
        { value: 3, label: "Per variable" },
    ];

    const onSubmit = async (data) => {
        const payload ={
            Name: data.type,
            Description: data.description,
            BasePrice: Number(data.basePrice),
            MinimumPrice: Number(data.minimumPrice),
            PricingModels: Number(data.priceingModel)
        }
        console.log(payload);
    }

    return (
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    className="input-glow"
                    placeholder="Type"
                    {...register("type")}
                />
                <input
                    type="text"
                    className="input-glow"
                    placeholder="description"
                    {...register("description")}
                />
                <input
                    type="number"
                    className="input-glow"
                    placeholder="baseprice"
                    {...register("basePrice")}
                />
                <input
                    type="number"
                    className="input-glow"
                    placeholder="minimumprice"
                    {...register("minimumPrice")}
                />
                <select className="input-glow" {...register('pricingModels')} defaultValue={0}>
                    {pricingModels.map((model) => (
                        <option key={model.value} value={model.value}>{model.label}</option>
                    ))}
                </select>
                <input type="submit" className="input-glow" onSubmit={onSubmit} />
            </form>
        </div>
    );
};

export default ServiceTypeForm;

