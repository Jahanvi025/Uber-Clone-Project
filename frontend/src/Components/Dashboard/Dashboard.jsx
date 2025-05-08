import React from 'react'
import logo from "../../assets/ubericon.png"
import { NavLink } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div className='bg-neutral-950 fixed h-full w-28 top-0 left-2 z-10 mt-2 mb-2 rounded-2xl drop-shadow-sm shadow-amber-100'>
        <div className='mt-2 mb-6'>
            <div className='flex justify-center items-center gap-2 px-2'>
                <img src={logo} alt="logoimg" className='h-6 w-6' />
                <h1 className='font-sans text-xl font-semibold text-white'>Uber</h1>
            </div>
        </div>
        <nav>
            <ul className='flex flex-col gap-5'>
            <li className='flex justify-center items-center gap-2'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'text-[#8B7AB3]' : 'text-gray-400 hover:text-[#8B7AB3] transition-colors duration-75 ease-in')}>Home</NavLink>
                </li>
                <li className='flex justify-center items-center gap-2'>
                    <NavLink to="/ride" className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400 hover:text-[#8B7AB3] transition-colors duration-75 ease-in')}>Ride</NavLink>
                </li>
                <li className='flex justify-center items-center gap-2'>
                    <NavLink to="/drive" className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400 hover:text-[#8B7AB3] transition-colors duration-75 ease-in')}>Drive</NavLink>
                </li>
                <li className='flex justify-center items-center gap-2'>
                    <NavLink to="/services" className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400 hover:text-[#8B7AB3] transition-colors duration-75 ease-in')}>Services</NavLink>
                </li>
                <li className='flex justify-center items-center gap-2'>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400 hover:text-[#8B7AB3] transition-colors duration-75 ease-in')}>Contact</NavLink>
                </li>
            </ul>
        </nav>
        
    </div>
  )
}

export default Dashboard
