import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex gap-2'>
        <Link className='text-purple-800' href="/customer">Kunder</Link>
        <Link className='text-purple-800' href="/dashboard">Schema</Link>
        <Link className='text-purple-800' href="/servicelocation">Städplats</Link>
        <Link className='text-purple-800' href="/servicetype">Tjänst</Link>
        <Link className='text-purple-800' href="/booking">Bokning</Link>
        <Link className='text-purple-800' href="/users">Anställda</Link>
    </div>
  )
}

export default Navbar