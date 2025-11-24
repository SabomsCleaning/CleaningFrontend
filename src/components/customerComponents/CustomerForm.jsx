"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerFormV2({ customer, setCustomer, setUpdateFlag }) {
  const emptyCustomer = {
    id: "",
    customerNumber: "",
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
    invoiceSameAsVisit: true,
    addVisitAsServiceLocation: true,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    defaultValues: emptyCustomer,
    shouldUnregister: true,
  });

  const invoiceSameAsVisit = watch("invoiceSameAsVisit");
  const addVisitAsServiceLocation = watch("addVisitAsServiceLocation");

  const isUpdate = !!customer?.id;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = isUpdate
    ? `${baseUrl}/Customer/${customer.id}`
    : `${baseUrl}/Customer`;

  useEffect(() => {
    if (customer) reset(customer);
  }, [customer]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      await response.json();

      emptyForm();
      setUpdateFlag((prev) => !prev);
    } catch (err) {
      alert("Kunde inte spara kunden");
    }
  };

  const emptyForm = () => {
    reset(emptyCustomer);
    unregister(["id", "customerNumber"]);
    setCustomer(null);
  };

  return (
    <div className="max-w-4xl px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-3 space-y-3 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Kundinformation
        </h2>

        {/* Kund info - 2 kolumner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Förnamn</label>
            <input
              className="w-full p-2 rounded-lg border border-gray-300"
              type="text"
              {...register("firstName", { required: true })}
              placeholder="Förnamn"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Efternamn</label>
            <input
              className="w-full p-2 rounded-lg border border-gray-300"
              type="text"
              {...register("lastName", { required: true })}
              placeholder="Efternamn"
            />
          </div>
        </div>

        {/* Kontakt */}
        <h3 className="text-lg font-semibold text-gray-700">Kontakt</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-inner p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-700">Email</label>
            <input
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("email")}
              placeholder="Email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-700">Telefonnummer</label>
            <input
              className="w-full p-2 rounded-lg border border-gray-300"
              {...register("phoneNumber")}
              placeholder="Telefonnummer"
            />
          </div>
        </div>

        {/* Besöksadress */}
        <h3 className="text-lg font-semibold text-gray-700">Besöksadress</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-inner p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full p-2 rounded-lg border border-gray-300"
            {...register("visitAddressLine")}
            placeholder="Adress"
          />

          <input
            className="w-full p-2 rounded-lg border border-gray-300"
            {...register("visitCity")}
            placeholder="Stad"
          />

          <input
            className="w-full p-2 rounded-lg border border-gray-300"
            {...register("visitPostalCode")}
            placeholder="Postnummer"
          />
        </div>

        {/* Checkboxar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2 text-gray-800">
            <input type="checkbox" {...register("invoiceSameAsVisit")} />
            Fakturaadress samma som besöksadress
          </label>

          <label className="flex items-center gap-2 text-gray-800">
            <input type="checkbox" {...register("addVisitAsServiceLocation")} />
            Serviceadress samma som besöksadress
          </label>
        </div>

        {/* Fakturaadress */}
        {!invoiceSameAsVisit && (
          <>
            <h3 className="text-lg font-semibold text-gray-700">
              Fakturaadress
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-inner p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("invoiceAddressLine")}
                placeholder="Adress"
              />
              <input
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("invoiceCity")}
                placeholder="Stad"
              />
              <input
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("invoicePostalCode")}
                placeholder="Postnummer"
              />
            </div>
          </>
        )}

        {/* Serviceadress */}
        {!addVisitAsServiceLocation && (
          <>
            <h3 className="text-lg font-semibold text-gray-700">
              Serviceadress
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-inner p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("serviceAddressLine")}
                placeholder="Adress"
              />
              <input
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("serviceCity")}
                placeholder="Stad"
              />
              <input
                className="w-full p-2 rounded-lg border border-gray-300"
                {...register("servicePostalCode")}
                placeholder="Postnummer"
              />
            </div>
          </>
        )}

        {/* Kommentar */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Kommentar</label>
          <input
            className="w-full p-2 rounded-lg border border-gray-300"
            {...register("description")}
            placeholder="Kommentar"
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
        >
          {customer?.id ? "Uppdatera" : "Spara"}
        </button>

        <button
          type="button"
          onClick={emptyForm}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg"
        >
          Töm formulär
        </button>
      </form>
    </div>
  );
}
