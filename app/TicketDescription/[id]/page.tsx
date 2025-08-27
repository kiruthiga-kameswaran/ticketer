"use client"
import React, { useEffect, useState } from 'react'
import type { Ticket } from '../../../types/Ticket';
import {useParams} from 'next/navigation';

const TicketDescription = () => {
  const [description, setDescription] = useState<Ticket>({} as Ticket);
  const { id } = useParams();

  useEffect(() => {
          const fetchDescription = async () => {
              const response = await fetch(`/api/description/${id}`);
              const data = await response.json();
              setDescription(data);
          };
          fetchDescription();
      }, []);

  return (
    <div className='p-4 mt-3'>
        <h2 className='text-3xl font-bold'>{description.title}</h2>
        <div className='mt-4'>
          <p className='text-gray-800'>{description.description}</p>
          <p className='text-gray-600 mt-2'>Priority: {description.priority}</p>
          <div className='mt-4 bg-gray-300 p-4'>
            <textarea className='border border-gray-300 p-2 w-full resize-none' name="comment" id="" placeholder='Add a comment...'></textarea>
            <button className='bg-blue-600 text-white p-2 rounded mt-2'>Add Comment</button>
          </div>
          <div className='mt-4'>
             <ul className='list-disc list-inside'>
                <li>Created By: {description.createdBy}</li>
                <li>Assignee: {description.assignee}</li>
            </ul>
          </div>
          <div className='mt-4 flex justify-end p-2'><button className='bg-gray-800 text-white p-2 rounded mt-2'>Mark as Done</button></div>
        </div>
    </div>
  )
}

export default TicketDescription