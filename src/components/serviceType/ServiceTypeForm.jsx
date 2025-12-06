"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createServiceType } from "../../server/actions/serviceType/ServiceTypeAction";

export default function ServiceTypeForm() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const pricingModels = [
    { value: 0, label: "Per timme" },
    { value: 1, label: "Per kvadratmeter" },
    { value: 2, label: "Per kvadratmeter (minimum)" },
    { value: 3, label: "Per kilometer" },
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
      reset();
      router.refresh();
    } catch (error) {
      console.error("Fel vid skapande: ", error);
    }
  };

  return (
    <div className="max-w-xl px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Skapa tjänst
        </h2>

        {/* Typ */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Typ</label>
          <input
            type="text"
            {...register("type", { required: true })}
            placeholder="Typ av tjänst"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div>

        {/* Beskrivning */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Beskrivning</label>
          <input
            type="text"
            {...register("description")}
            placeholder="Beskrivning"
            className="w-full p-2 rounded-lg border border-gray-300"
          />
        </div>

        {/* Prisfält i två kolumner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Grundpris</label>
            <input
              type="text"
              {...register("basePrice")}
              placeholder="Grundpris"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Minimumpris
            </label>
            <input
              type="text"
              {...register("minimumPrice")}
              placeholder="Minimumpris"
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Prissättning */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Prismodell</label>
          <select
            {...register("pricingModels")}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white"
          >
            {pricingModels.map((model) => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>

        {/* Spara-knapp */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
        >
          Spara
        </button>

        {/* Töm-knapp */}
        <button
          type="button"
          onClick={() => reset()}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition"
        >
          Töm formulär
        </button>
      </form>
    </div>
  );
}
