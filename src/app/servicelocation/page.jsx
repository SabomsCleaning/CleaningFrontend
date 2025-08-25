"use client";
import React, { useEffect, useState } from "react";
import ServiceLocationForm from "../../components/forms/ServiceLocationForm";

const ServiceLocation = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [customers, setCustomers] = useState([]);
    const [serviceLocation, setServiceLocation] = useState([]);

    const getCustomers = async () => {
        const response = await fetch(`${baseURL}/Customer`);
        const data = await response.json();
        setCustomers(data);
    };

    const getServiceLocation = async (customerId) => {
        if (!customerId) return;
        const response = await fetch(
            `${baseURL}/ServiceLocation/${customerId}`
        );
        const data = await response.json();
        setServiceLocation(data);
        console.log(data);
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <div>
            <h2>ServiceLocation</h2>
            <select onChange={(e) => getServiceLocation(e.target.value)}>
                <option value="">-- Välj kund--</option>
                {customers.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.firstName} {service.lastName}
                    </option>
                ))}
            </select>

            {serviceLocation &&
                serviceLocation.length > 0 &&
                serviceLocation.map((service) => (
                    <div key={service.id}>
                        <p>{service.address.addressLine}</p>
                    </div>
                ))}
            {/* <ServiceLocationForm/> */}
        </div>
    );
};

export default ServiceLocation;
