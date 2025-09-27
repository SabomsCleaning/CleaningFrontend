"use client";
import React, { useEffect, useState } from "react";
import ServiceLocationForm from "../../components/forms/ServiceLocationForm";

const ServiceLocation = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [customers, setCustomers] = useState([]);
    const [serviceLocations, setServiceLocations] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [updateFlag, setUpdateFlag] = useState(false);

    const getCustomers = async () => {
        const response = await fetch(`${baseURL}/Customer`);
        const data = await response.json();
        setCustomers(data);
    };

    const handleSelectCustomer = (customerId) => {
        setSelectedCustomerId(customerId);
        getServiceLocation(customerId);
    };

    const getServiceLocation = async (customerId) => {
        if (!customerId) return;
        const response = await fetch(
            `${baseURL}/ServiceLocation/${customerId}`
        );
        const data = await response.json();
        console.log(data)
        setServiceLocations(data);
    };

    const handleServiceLocation = (service) => {
        setSelectedService(service);
    };

    const removeServiceLocation = async (serviceId) => {
        var response = await fetch(`${baseURL}/ServiceLocation/${serviceId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        getServiceLocation(selectedCustomerId);
        console.log(data);
    };

    useEffect(() => {
        getCustomers();
        if (selectedCustomerId) {
            getServiceLocation(selectedCustomerId);
        }
    }, [updateFlag, setSelectedCustomerId]);

    return (
        <div className="grid grid-cols-2">
            <div>

            <h2>Kund</h2>
            <select
                onChange={(e) => handleSelectCustomer(e.target.value)}
                className="border p-1 rounded-lg m-1 min-w-sm">
                <option value="">-- Välj kund--</option>
                {customers.map((service) => (
                    
                    <option key={service.id} value={service.id}>
                        {service.firstName} {service.lastName}
                    </option>
                ))}
            </select>


            <h2>ServiceLocation</h2>
            {serviceLocations &&
                serviceLocations.length > 0 &&
                serviceLocations.map((service) => (
                    <span
                    className={ `flex items-center justify-between m-1 border-1 rounded-xl p-1 w-fit min-w-sm ${service.isDefault ? "bg-blue-100" : "bg-white"}`}
                    key={service.id}>
                        <div className="flex flex-col">
                            <p>{service.address.addressLine}</p>
                            <p>{service.address.city}</p>
                            <p>{service.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="border-1 p-1 rounded-xl bg-white"
                                onClick={() => {
                                    handleServiceLocation(service);
                                }}>
                                Redigera
                            </button>
                            <button
                                onClick={() =>
                                    removeServiceLocation(service.id)
                                }>
                                Radera
                            </button>
                        </div>
                    </span>
                ))}
                </div>
            <ServiceLocationForm
                service={selectedService}
                customerId={selectedCustomerId}
                setUpdateFlag={setUpdateFlag}
                />
        </div>
    );
};

export default ServiceLocation;
