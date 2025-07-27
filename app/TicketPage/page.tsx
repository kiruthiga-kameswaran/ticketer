import React from 'react'
import TicketCard from '../(components)/TicketCard'

const TicketPage = () => {
  return (
    <div>
      <div className='lg:grid grid-cols-2 xl:grid-cols-4'>
        <TicketCard/>
        <TicketCard/>
        <TicketCard/>
        <TicketCard/>
      </div>
    </div>
  )
}

export default TicketPage