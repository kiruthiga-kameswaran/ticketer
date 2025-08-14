import React from 'react'
import TicketPage from '../(components)/TicketPage'
import { auth } from "@/auth";


const DashBoard = async () => {
  const session = await auth();
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Welcome, {session?.user?.email}</h1>
      <p className='text-gray-600'>See your assigned tasks here</p>
      <TicketPage/>
    </div>
  )
}

export default DashBoard