import React from 'react'
import Image from 'next/image'
import { applyBungieDomain } from '../utils/url-handling'
import { DestinyActivityDefinition } from '../types/activities'
import { DestinyMilestoneActivity } from '../types/milestone'
import { FormattedMilestone } from '../lib/milestones'
import Tooltip from './Tooltip'

type WeeklyCardProps = {
  activity: FormattedMilestone
}
const WeeklyCard = ({ activity }: WeeklyCardProps) => {
  const { modifiers, rewards } = activity

  const modifierIcons = modifiers.map((modifier) => {
    const { icon, name, hash, description } = modifier
    const tooltipMessage = (
      <div className="flex flex-col gap-2">
        <p className="whitespace-nowrap text-xl font-bold">{name}</p>
        <p>{description}</p>
      </div>
    )

    return (
      <Tooltip key={hash} message={tooltipMessage}>
        <Image
          src={applyBungieDomain(icon)}
          width={48}
          height={48}
          alt={'icon'}
          className="transition-all duration-100 hover:bg-modifier-blue rounded-full p-1"
        />
      </Tooltip>
    )
  })

  const activityRewards = rewards.map((reward) => {
    const { icon, name, hash } = reward
    return (
      <div key={hash} className="flex flex-col gap-2">
        <Image src={applyBungieDomain(icon)} width={32} height={32} alt={`Reward icon: ${name}`} />
      </div>
    )
  })

  return (
    <article className="animate-slide ">
      <div className="flex flex-wrap items-center gap-2">{modifierIcons}</div>
      <div className="flex flex-wrap items-center gap-2">{activityRewards}</div>
    </article>
  )
}

export default WeeklyCard
