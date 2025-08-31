"use client"
import axios from 'axios'
//import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import { VscLightbulbSparkle } from 'react-icons/vsc';

const TicketForm = () => {
    const ticketData={
        title:"",
        description:"",
        priority:"",
        progress:0,
        status:"Assigned",
        active:"Yes",
        assigneeId:0,
        createdById:0
    }
    const [formdata,setformdata]=useState(ticketData);
    type Assignee = { id: number; name: string };
    const [assignees, setassignees] = useState<Assignee[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchAssignees = async () => {
            const response = await fetch('/api/assignee');
            const data = await response.json();
            setassignees(data);
        };
        fetchAssignees();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setformdata({
            ...formdata,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(session?.user?.id){
            formdata.createdById = parseInt(session.user.id as string);
        }
        try {
            const response = await axios.post('/api/ticket', formdata);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const generateDescription = async () => {
        try {
            const response = await axios.get(`/api/aidescription/${formdata.title}`);
            setformdata({ ...formdata, description: response.data });
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div>
        <form className='bg-white p-6 rounded shadow-md flex flex-col w-96' onSubmit={handleSubmit} method='POST'>
            <input className='border border-gray-300 p-2 rounded mb-4' type="text" name="title" placeholder="Title" value={formdata.title} onChange={handleChange} required />
            <div className="relative mb-4">
                    <textarea 
                        className='border border-gray-300 p-2 rounded w-full min-h-[100px]' 
                        name="description" 
                        placeholder="Description" 
                        value={formdata.description} 
                        onChange={handleChange} 
                        required
                    ></textarea>
                    <button 
                        type="button"
                        onClick={generateDescription}
                        className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                        <VscLightbulbSparkle className="inline-block mr-1" />
                        Generate
                    </button>
                </div>
            <select className='border border-gray-300 p-2 rounded mb-4' name="priority" value={formdata.priority} onChange={handleChange} required>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="Urgent">Urgent</option>
            </select>
            <select className='border border-gray-300 p-2 rounded mb-4' name="assignee" value={formdata.assigneeId} onChange={(e) => setformdata({...formdata, assigneeId: parseInt(e.target.value)})} required>
                <option value="">Select Assignee</option>
                {assignees.map((assignee) => (
                    <option key={assignee.id} value={assignee.id}>
                        {assignee.name}
                    </option>
                ))}
            </select>
            <button className='bg-gray-800 text-white p-2 rounded' type="submit">Create Ticket</button>
        </form>
    </div>
  )

}

export default TicketForm