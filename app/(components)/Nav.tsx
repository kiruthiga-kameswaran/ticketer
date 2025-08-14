import React from 'react'
import Link from 'next/link';
import { FaTicket } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { logoutAction } from '../actions/logoutAction';

const Nav = () => {
  return (
    <nav className="flex justify-between bg-slate-900 border-b border-gray-200" >
      <div className='flex items-center'>
         <Link className='flex space-x-4 p-4' href="/"><FaHome className='flex items-center text-white'/> <p className='text-white'>Home</p></Link>
         <Link className='flex space-x-4 p-4' href="/AddTicket"><FaTicket className='flex items-center text-white'/> <p className='text-white'>New Ticket</p></Link>
      </div>
      <div className='flex items-center space-x-4 p-4'>
        <button className='text-white' onClick={logoutAction}>Logout</button>
      </div>
    </nav>
  )
}

export default Nav