import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
        <Link href="/customer">Customer</Link>
        <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}

export default Navbar