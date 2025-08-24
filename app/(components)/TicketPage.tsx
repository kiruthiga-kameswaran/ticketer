"use client"

import React, { use, useEffect} from 'react'
import TicketCard from './TicketCard'
import { useRecoilState } from 'recoil';
import { TicketsAtom } from '../../store/TicketsAtom';
import type {Ticket} from '../../types/Ticket';
import { useTickets } from '../../store/TicketsContext';

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
        {tickets.map((ticket)=><TicketCard key={ticket.id} ticket={ticket}/> )}
      </div>
    </div>
  )
}

export default TicketPage