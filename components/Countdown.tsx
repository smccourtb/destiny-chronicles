'use client'
import React, { useEffect, useState } from 'react'
import { timeTo, TimeToReturn } from '../utils/time'

type CountdownProps = {
  timestamp: string
  options?: CountdownOptions
}

type UnitsSettings = {
  seconds: boolean
  minutes: boolean
  hours: boolean
  days: boolean
  months: boolean
}

type CountdownOptions = {
  units: UnitsSettings
  separator?: string
  updateInterval?: number
  labels?: {
    seconds?: string
    minutes?: string
    hours?: string
    days?: string
    months?: string
  }
  styles?: {
    units: string
    labels: string
    separator: string
  }
}

const defaultOptions: FormatDisplayOptions = {
  units: {
    months: true,
    days: true,
    hours: true,
    minutes: true,
    seconds: false,
  },
  separator: ' / ',
  updateInterval: 1000 * 60, // 1 minute
  labels: {
    seconds: 's',
    minutes: 'm',
    hours: 'h',
    days: 'd',
    months: 'M',
  },
  styles: {
    units: 'text-inherit text-2xl font-bold',
    labels: 'text-inherit text-sm font-light',
    separator: 'text-inherit opacity-60',
  },
}

type FormatDisplayOptions = {
  units: UnitsSettings
  separator: string
  updateInterval: number
  labels: {
    seconds: string
    minutes: string
    hours: string
    days: string
    months: string
  }
  styles: {
    units: string
    labels: string
    separator: string
  }
}

const formatDisplay = (time: TimeToReturn, options: FormatDisplayOptions) => {
  const { units, separator, styles, labels } = options
  const unitsToDisplay = Object.entries(units).filter((unit) => unit[1])
  return unitsToDisplay.map((unit, index) => {
    const isLast = index === unitsToDisplay.length - 1
    const unitValue = time[unit[0] as keyof typeof time]
    const unitLabel = labels?.[unit[0] as keyof typeof options.labels]
    return (
      <React.Fragment key={unit[0]}>
        <span className={styles?.units}>{unitValue}</span>
        <span className={styles?.labels}>{unitLabel}</span>
        <span className={styles?.separator}>{isLast ? '' : separator}</span>
      </React.Fragment>
    )
  })
}

const Countdown = ({ timestamp, options }: CountdownProps) => {
  const [time, setTime] = useState(timeTo(timestamp))
  // options is conditional, so we spread defaultOptions and overwrite with options if it exists
  const settings = { ...defaultOptions, ...options }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeTo(timestamp))
    }, options?.updateInterval || settings.updateInterval)
    return () => clearInterval(interval)
  }, [])

  return <p className="font-text">{formatDisplay(time, settings as FormatDisplayOptions)}</p>
}

export default Countdown
