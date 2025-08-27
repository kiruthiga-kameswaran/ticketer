"use client"

import React from 'react'
import Link from 'next/link';
import { FaTicket } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { logoutAction } from '../actions/logoutAction';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between bg-slate-900 border-b border-gray-200">
      <div className='flex items-center ml-5'>
        {session ? (
          <>
            <Link className='flex p-4' href="/AddTicket">
              <div className='h-6 flex items-center'><FaTicket className='text-white'/></div>
              <p className='text-white'>New Ticket</p>
            </Link>
            <Link className='flex p-4' href="/dashboard">
              <div className='h-6 flex items-center'><FaTicket className='text-white'/></div>
              <p className='text-white'>DashBoard</p>
            </Link>
          </>
        ) : (
          <Link className='flex p-4' href="/">
            <div className='h-6 flex items-center'><FaHome className='text-white'/></div>
            <p className='text-white'>Home</p>
          </Link>
        )}
      </div>
      
      {session ? (
        <div className='flex items-center space-x-4 p-4'>
          <button className='text-white' onClick={logoutAction}>Logout</button>
        </div>
      ) : (
        <div className='flex items-center space-x-4 p-4'>
          <Link className='flex' href="/auth/signin">
            <p className='text-white'>Login</p>
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Nav