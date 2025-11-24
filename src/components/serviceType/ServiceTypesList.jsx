"use client";

import DeleteServiceTypeButton from "./DeleteServiceTypeButton";

export default function ServiceTypesTable({ serviceTypes }) {
  const pricingModels = [
    { value: 0, label: "Per timme" },
    { value: 1, label: "Per kvm" },
    { value: 2, label: "Per kvm minimum" },
    { value: 3, label: "Variabel" },
  ];

  const getPricingLabel = (value) =>
    pricingModels.find((p) => p.value === value)?.label || "Okänd";

  return (
    <div className="max-h-[600px] overflow-y-auto bg-white rounded-xl shadow-md border border-gray-200 p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Tjänster</h3>

      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            <th className="text-left p-2 border-b font-medium text-gray-700">Tjänst</th>
            <th className="text-left p-2 border-b font-medium text-gray-700">Pris</th>
            <th className="text-left p-2 border-b font-medium text-gray-700">Minimipris</th>
            <th className="text-left p-2 border-b font-medium text-gray-700">Modell</th>
            <th className="text-left p-2 border-b font-medium text-gray-700 w-24">Åtgärd</th>
          </tr>
        </thead>

        <tbody>
          {serviceTypes.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50 transition">
              <td className="p-2 border-b">{s.name}</td>

              <td className="p-2 border-b">
                {s.basePrice ? `${s.basePrice} kr` : "-"}
              </td>

              <td className="p-2 border-b">
                {s.minimumPrice ? `${s.minimumPrice} kr` : "-"}
              </td>

              <td className="p-2 border-b">
                {getPricingLabel(s.pricingModel)}
              </td>

              <td className="p-2 border-b">
                <DeleteServiceTypeButton id={s.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
