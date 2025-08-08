"use client"
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const TicketForm = () => {
    const ticketData={
        title:"",
        description:"",
        priority:"",
        progress:0,
        status:"Assigned",
        active:"Yes",
        assigneeId:0
    }
    const [formdata,setformdata]=useState(ticketData);
    type Assignee = { id: number; name: string };
    const [assignees, setassignees] = useState<Assignee[]>([]);

    useEffect(() => {
        const fetchAssignees = async () => {
            const response = await fetch('/api/assignee');
            const data = await response.json();
            setassignees(data);
        };
        fetchAssignees();
    }, []);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;
        setformdata({
            ...formdata,
            [name]: value
        });
    }
  return ( 
    <div>
        <form className='bg-white p-6 rounded shadow-md flex flex-col w-96' onSubmit={handleSubmit}>
            <input className='border border-gray-300 p-2 rounded mb-4' type="text" name="title" placeholder="Title" value={formdata.title} onChange={(e) => setformdata({...formdata, title: e.target.value})} required />
            <textarea className='border border-gray-300 p-2 rounded mb-4' name="description" placeholder="Description" value={formdata.description} onChange={(e) => setformdata({...formdata, description: e.target.value})} required></textarea>
            <select className='border border-gray-300 p-2 rounded mb-4' name="priority" value={formdata.priority} onChange={(e) => setformdata({...formdata, priority: e.target.value})} required>
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
                <option value="11">John Doe</option>
            </select>
            <button className='bg-gray-800 text-white p-2 rounded' type="submit">Create Ticket</button>
        </form>
    </div>
  )

}

export default TicketForm