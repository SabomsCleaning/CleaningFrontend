'use client'

import React from 'react'

const ServiceTypesList = ({serviceTypes}) => {
    console.log(serviceTypes)
  return (
    <div>
        {serviceTypes.map((s) => 
        <li key={s.id}>{s.name}</li>
        )}
    </div>
  )
}

export default ServiceTypesList