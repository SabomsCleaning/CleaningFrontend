"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createServiceType } from "@/server/serviceTypeApi";

const ServiceTypeForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const pricingModels = [
    { value: 0, label: "Per timme" },
    { value: 1, label: "Per kvadratmeter" },
    { value: 2, label: "Per kvadratmeter (minimum)" },
    { value: 3, label: "Per variable" },
  ];

  const onSubmit = async (data) => {
    const payload = {
      Name: data.type,
      Description: data.description,
      BasePrice: Number(data.basePrice),
      MinimumPrice: Number(data.minimumPrice),
      PricingModel: Number(data.pricingModels),
    };
    try {
      await createServiceType(payload);
      router.refresh();
      reset();
    } catch {
      console.error("Fel vid skapande: ", error);
    }
    console.log(payload);
  };

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
          placeholder="Description"
          {...register("description")}
        />
        <input
          type="number"
          className="input-glow"
          placeholder="Baseprice"
          {...register("basePrice")}
        />
        <input
          type="number"
          className="input-glow"
          placeholder="Minimumprice"
          {...register("minimumPrice")}
        />
        <select
          className="input-glow"
          {...register("pricingModels")}
          defaultValue={0}
        >
          {pricingModels.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
        <input type="submit" className="input-glow" />
      </form>
    </div>
  );
};

export default ServiceTypeForm;
