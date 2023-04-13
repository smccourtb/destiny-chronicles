import React from 'react'

type PerkTooltipProps = { name: string; type: string; description: string }
const PerkTooltip = ({ name, type, description }: PerkTooltipProps) => {
  return (
    <div className="flex flex-col bg-background-dark rounded bg-opacity-95 w-96">
      <header className="flex flex-col p-2.5 border-t border-t-[3px] border-[#7e7e7e]">
        <p className="text-white font-semibold text-xl uppercase tracking-wide">{name}</p>
        <p className="text-[#a0a0a0]">{type}</p>
      </header>
      <main className="flex flex-col p-2.5 gap-1 bg-[#1f2022] rounded-b whitespace-pre-line bg-opacity-95">
        {description}
      </main>
    </div>
  )
}

export default PerkTooltip
