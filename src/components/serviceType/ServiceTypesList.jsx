import React from "react";
import DeleteServiceTypeButton from "./DeleteServiceTypeButton";

const ServiceTypesList = ({ serviceTypes }) => {
  const pricingModels = [
    { value: 0, label: "Per timme" },
    { value: 1, label: "Per kvm" },
    { value: 2, label: "Per kvm minimum" },
    { value: 3, label: "Variabel" },
  ];

  const getPricingLabel = (value) =>
    pricingModels.find((p) => p.value === value)?.label || "Okänd modell";

  return (
    <div className="space-y-3 p-4">
      {serviceTypes.map((s) => (
        <div
          key={s.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
        >
          {/* Top row */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {s.name}
            </h2>

            <DeleteServiceTypeButton id={s.id} />
          </div>

          {/* Description */}
          {s.description && (
            <p className="text-gray-600 text-sm mt-1 mb-3">
              {s.description}
            </p>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
            <div>
              <span className="font-medium text-gray-800">Pris ink rut:</span><br />
              {s.basePrice ? `${s.basePrice} kr` : "-"}
            </div>

            {s.minimumPrice && (
              <div>
                <span className="font-medium text-gray-800">Minimipris:</span><br />
                {s.minimumPrice} kr
              </div>
            )}

            <div>
              <span className="font-medium text-gray-800">Modell:</span><br />
              {getPricingLabel(s.pricingModel)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceTypesList;
