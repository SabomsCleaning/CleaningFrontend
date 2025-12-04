import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex gap-2'>
        <Link className='text-purple-800' href="/customer">Customer</Link>
        <Link className='text-purple-800' href="/dashboard">Dashboard</Link>
        <Link className='text-purple-800' href="/servicelocation">Service location</Link>
        <Link className='text-purple-800' href="/servicetype">Service type</Link>
        <Link className='text-purple-800' href="/booking">Booking</Link>
        <Link className='text-purple-800' href="/users">Användare</Link>
    </div>
  )
}

export default Navbar