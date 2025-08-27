"use client"

import React, { use, useEffect} from 'react'
import TicketCard from './TicketCard'
import { useTickets } from '../../store/TicketsContext';
import Link from 'next/link';

const getTickets = async () => {
  const response = await fetch('/api/ticket');
  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }
  return response.json();
}

const TicketPage = () => {
  const { tickets, setTickets } = useTickets();

  useEffect(() => {
    try{
      const fetchTickets = async () => {
        const data = await getTickets();
        setTickets(data.tickets);
      }
      fetchTickets();
    }catch(error){
      console.error(error);
    }
  }, [setTickets])

  return (
    <div>
      <div className='lg:grid grid-cols-2 xl:grid-cols-4'>
        {tickets.map((ticket)=>
        <>
        <Link href={`/TicketDescription/${ticket.id}`}>
          <TicketCard key={ticket.id} ticket={ticket}/> 
        </Link>
        </>
        )}
      </div>
    </div>
  )
}

export default TicketPage