import React from 'react'

type StatusDisplayProps = {
  status:string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  return (
    <span className='inline-block rounded-full px-2 py-1 text-xs bg-gray-200 text-gray-800'>
      {status}
    </span>
  )
}

export default StatusDisplay