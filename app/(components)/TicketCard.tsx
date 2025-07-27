import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressDisplay from './ProgressDisplay'
import StatusDisplay from './StatusDisplay'

const TicketCard = () => {
  return (
    <div className='flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2'>
        <div className='flex justify-between items-center mb-2'>
             <PriorityDisplay/>
             <div className='ml-auto'>
                 <DeleteBlock/>
             </div>
        </div>
        <h3 className='text-lg font-semibold mb-1'>Ticket Title</h3>
        <p className='whitespace-pre-wrap'>This is a brief description of the ticket.</p>
        <div className='flex-grow'></div>
        <div className='flex justify-between items-center mt-2'>
            <span className='text-sm text-gray-500'>Created by User</span>
            <span className='text-sm text-gray-500'>Due: 2023-10-31</span>
        </div>
        <div className='flex justify-between items-center mt-2 space-x-2'>
            <ProgressDisplay/>
            <StatusDisplay/>
        </div>
    </div>
  )
}

export default TicketCard