import React from 'react'
import '../styles/global.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <ul className='navbar-links'>
            <li><a href="/">Home</a></li>
            <li><a href="/customers">Customers</a></li>
            <li><a href="/employees">Employees</a></li>
            <li><a href="/cars">Cars</a></li>
            <li><a href="/carModels">Car Models</a></li>
            <li><a href="/repairs">Repairs</a></li>
            <li><a href="/transactions">Transactions</a></li>
        </ul>
    </nav>
  )
}

export default Navbar