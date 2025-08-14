import React from 'react'

const TicketDescription = () => {
  return (
    <div className='p-4 mt-3'>
        <h2 className='text-3xl font-bold'>Ticket Title</h2>
        <div className='mt-4'>
          <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est ea vel mollitia? Eos ex aliquid aperiam est iusto esse tenetur velit quibusdam, vero voluptates! Tempora temporibus voluptatibus culpa quibusdam.</p>
          <div className='mt-4 bg-gray-300 p-4'>
            <textarea className='border border-gray-300 p-2 w-full resize-none' name="comment" id="" placeholder='Add a comment...'></textarea>
            <button className='bg-blue-600 text-white p-2 rounded mt-2'>Add Comment</button>
          </div>
          <div className='mt-4'>
             <ul className='list-disc list-inside'>
                <li>Created By: User</li>
                <li>Assignee: User</li>
            </ul>
          </div>
          <div className='mt-4 flex justify-end p-2'><button className='bg-gray-800 text-white p-2 rounded mt-2'>Mark as Done</button></div>
        </div>
    </div>
  )
}

export default TicketDescription