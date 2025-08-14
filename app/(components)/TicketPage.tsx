"use client"

import React, { useEffect} from 'react'
import TicketCard from '../(components)/TicketCard'
import { useRecoilState } from 'recoil';
import TicketsAtom from '@/store/TicketsAtom';

const getTickets = async () => {
  const response = await fetch('/api/ticket');
  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }
  return response.json();
}

type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  createdBy: string; 
  dueDate?: string; // optional, as it may not be returned by the API
  // add other properties as needed, e.g. title: string;
};

const TicketPage = () => {
  const [tickets, setTickets] = useRecoilState<Ticket[]>(TicketsAtom);

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
  }, [])

  return (
    <div>
      <div className='lg:grid grid-cols-2 xl:grid-cols-4'>
        {tickets.map((ticket)=><TicketCard key={ticket.id} ticket={ticket}/> )}
      </div>
    </div>
  )
}

export default TicketPage