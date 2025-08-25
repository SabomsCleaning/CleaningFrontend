'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import {useState, useEffect} from 'react'

const ServiceLocationPage = () => {
    const { id } = useParams();
    const [serviceLocationData, setServiceLocationData]= useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const getServiceLocation = async () => {
        try {
            const result = await fetch(`${baseUrl}/ServiceLocation/${id}`)
            const data = await result.json();
            setServiceLocationData(data)
        } catch (error) {
            console.error("Fel vid sidhämtning", error);
        }
    }

    useEffect(() => {
        if (id) getServiceLocation();
    }, [id])
  return (
    <div>
        <ul>
            {serviceLocationData.map(service => (
                <li key={service.id}>
                    {service.address.addressLine}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ServiceLocationPage