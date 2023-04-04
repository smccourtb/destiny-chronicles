import React from 'react'

type TooltipProps = {
  message: string | JSX.Element
  children: React.ReactNode
}

export default function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="group relative flex">
      {children}
      <span className="z-50 w-max-content absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 border-t-4 border-white">
        {message}
      </span>
    </div>
  )
}
