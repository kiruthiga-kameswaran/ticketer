import React from 'react'
import TicketForm from '../(components)/TicketForm'

const page = () => {
  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1>Create Ticket</h1>
      <TicketForm />
    </div>
  )
}

export default page