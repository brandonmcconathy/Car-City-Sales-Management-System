import React from 'react'
import '../styles/global.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
        <ul className='navbar-links'>
            <li><a href="/">Home</a></li>
            <li><a href="/customers">Customers</a></li>
        </ul>
    </nav>
  )
}

export default Navbar