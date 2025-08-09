import React from 'react'
import { FcHighPriority } from "react-icons/fc";

interface PriorityDisplayProps {
  priority: string; // Change type as appropriate (string, number, etc.)
}

const PriorityDisplay: React.FC<PriorityDisplayProps> = ({ priority }) => {
  return (
    <div className='flex align-baseline'>
      {priority === "Urgent" && <><FcHighPriority /><FcHighPriority /><FcHighPriority /></>}
      {priority === "Mid" && <><FcHighPriority /><FcHighPriority /></>}
      {priority === "Low" && <><FcHighPriority /></>}
    </div>
  )
}

export default PriorityDisplay