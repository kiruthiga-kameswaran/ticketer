import React from 'react'
import { FaX } from "react-icons/fa6";


interface DeleteBlockProps {
  ticketId: string; // or number, depending on your data type
}

const DeleteBlock: React.FC<DeleteBlockProps> = ({ ticketId }) => {
  const handleDelete = () => {
    // Implement delete functionality here
    console.log(`Deleting ticket with ID: ${ticketId}`);
  }

  return (
    <FaX
      className="text-red-500 hover:text-red-700 cursor-pointer"
      onClick={handleDelete}
    />
  )
}

export default DeleteBlock