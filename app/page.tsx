import React from 'react'
import TicketPage from './(components)/TicketPage'


const DashBoard = () => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Welcome, User</h1>
      <p className='text-gray-600'>See your assigned tasks here</p>
      <TicketPage/>
    </div>
  )
}

export default DashBoard