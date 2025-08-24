import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'
import { Ticket } from '../../types/Ticket'

type TicketCardProps = {
  ticket: Ticket;
};

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className='flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2'>
        <div className='flex justify-between items-center mb-2'>
             <PriorityDisplay priority={ticket.priority} />
             <div className='ml-auto'>
                 <DeleteBlock ticketId={ticket.id} />
             </div>
        </div>
        <h3 className='text-lg font-semibold mb-1'>{ticket.title}</h3>
        <p className='whitespace-pre-wrap'>{ticket.description}</p>
        <div className='flex-grow'></div>
        <div className='flex justify-between items-center mt-2'>
            <span className='text-sm text-gray-500'>Created by {ticket.createdBy}</span>
            <span className='text-sm text-gray-500'>Due: {ticket.dueDate}</span>
        </div>
        <div className='flex justify-between items-center mt-2 space-x-2'>
            <ProgressDisplay progress={ticket.progress} />
            <StatusDisplay status={ticket.status} />
        </div>
    </div>
  )
}

export default TicketCard