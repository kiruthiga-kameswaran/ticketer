"use client"
import React, { useEffect, useState } from 'react'
import type { Ticket } from '../../../types/Ticket';
import {useParams} from 'next/navigation';
import { VscLightbulbSparkle } from 'react-icons/vsc';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TicketDescription = () => {
  const [description, setDescription] = useState<Ticket>({} as Ticket);
  const { id } = useParams();
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
          const fetchDescription = async () => {
              const response = await axios.post("/api/description", { id });
              setDescription(response.data);
          };
          fetchDescription();
      }, []);

  const handleSummarize = async() => {
      const response = await axios.post('/api/summarizer', { description: description.description });
      setSummary(response.data);
  };

  return (
     <div className='p-4 mt-3'>
        <h2 className='text-3xl font-bold'>{description.title}</h2>
        <div className='mt-4 text-gray-800'>
          <ReactMarkdown>{description.description}</ReactMarkdown>
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
          <div className='mt-4 flex justify-start p-2'><button onClick={handleSummarize} className='bg-gray-800 text-white p-2 rounded mt-2'><VscLightbulbSparkle className='inline-block mr-1' />Summarize</button></div>
          <div className='mt-4 p-2'><p className='text-gray-800'>Summary: {summary}</p></div>
          <div className='mt-4 flex justify-end p-2'><button className='bg-gray-800 text-white p-2 rounded mt-2'>Mark as Done</button></div>
        </div>
    </div>
  )
}

export default TicketDescription