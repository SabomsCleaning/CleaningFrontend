"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CustomerForm = ({ customer, setCustomer, setUpdateFlag }) => {
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
    addVisitAsServiceLocation: false,
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
  const invoiceSameAsVisit = watch("invoiceSameAsVisit", true);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const isUpdate = !!customer?.id;
  const url = isUpdate
    ? `${baseUrl}/Customer/${customer.id}`
    : `${baseUrl}/Customer`;

  useEffect(() => {
    if (customer) reset(customer);
    //else reset(emptyCustomer);
  }, [customer, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch(`${url}`, {
      method: isUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    // just for update in customerList
    emptyForm();
    setUpdateFlag((prev) => !prev);
  };

  const emptyForm = () => {
    console.log("töm formulär");
    reset(emptyCustomer);
    unregister(["id", "customerNumber"]);
    setCustomer(null);
  };

  return (
    <div className="w-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex gap-2">
          <div className="grid w-full">
            <input
              className="input-glow"
              type="text"
              {...register("firstName", { required: "Förnamn måste fyllas i" })}
              placeholder="Förnamn"
            />
            {errors.firstName && (
              <div className="text-red-500 mx-2">
                {errors.firstName.message}
              </div>
            )}
          </div>
          <div className="grid w-full">
            <input
              className="input-glow"
              type="text"
              {...register("lastName", {
                required: "Efternamn är obligatoriskt",
              })}
              placeholder="Efternamn"
            />
            {errors.lastName && (
              <div className="text-red-500 mx-2">{errors.lastName.message}</div>
            )}
          </div>
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
          className="input-glow"
          type="text"
          {...register("visitAddressLine")}
          placeholder="Address"
        />
        <div className="flex">
          <input
            className="input-glow w-full"
            type="text"
            {...register("visitCity")}
            placeholder="Stad"
          />
          <input
            className="input-glow w-full"
            type="text"
            {...register("visitPostalCode")}
            placeholder="Postnummer"
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
          <div className="flex flex-col">
            <input
              type="text"
              {...register("invoiceAddressLine")}
              placeholder="Faktura address"
              className="input-glow"
            />
            <div className="flex w-full">
              <input
                type="text"
                {...register("invoiceCity")}
                placeholder="Stad"
                className="input-glow w-full"
              />
              <input
                type="text"
                {...register("invoicePostalCode")}
                placeholder="Postkod"
                className="input-glow w-full"
              />
            </div>
          </div>
        )}
        <button type="submit" className="border-1 rounded-xl p-2 m-1">
          {customer?.id ? "Uppdatera" : "Spara"}
        </button>
        <button
          type="button"
          className="border-1 rounded-xl p-2 m-1"
          onClick={() => {
            emptyForm();
          }}
        >
          Töm formulär
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
