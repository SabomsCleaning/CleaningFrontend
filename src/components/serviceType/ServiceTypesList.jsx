import React from 'react'
import DeleteServiceTypeButton from './DeleteServiceTypeButton'

const ServiceTypesList = ({serviceTypes}) => {
  return (
    <div>
        {serviceTypes.map((s) => (
            <ul key={s.id} className='bg-green-300 border-2 m-1'>
                <li>{s.name}</li>
                <DeleteServiceTypeButton id={s.id}/>
            </ul>
        ))}
    </div>
  )
}

export default ServiceTypesList
