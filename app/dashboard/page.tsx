"use client"

import React from 'react'
import TicketPage from '../(components)/TicketPage'
import { useSession } from 'next-auth/react';


const DashBoard = () => {
  const { data: session } = useSession();
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Welcome, {session?.user?.email}</h1>
      <p className='text-gray-600'>See your assigned tasks here</p>
      <TicketPage/>
    </div>
  )
}

export default DashBoard