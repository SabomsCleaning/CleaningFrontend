import React from 'react'
import {useForm} from 'react-hook-form'

const ServiceLocationForm = () => {
    const { register } = useForm();
  return (
    <div>
        <form className='flex flex-col'>
            <input type="text" placeholder='AddressLine' {...register("AddressLine")} className='input-glow' />
            <input type="text" placeholder='PostalCode' {...register("PostalCode")} className='input-glow' />
            <input type="text" placeholder='City' {...register("City")} className='input-glow' />
            <input type="text" placeholder='Description' {...register("Description")} className='input-glow' />
            <label>

            <input type="checkbox" {...("IsDefault")} />
             Isdefault</label>
             <button type="submit" className='input-glow'>Spara</button>
        </form>
    </div>
  )
}

export default ServiceLocationForm