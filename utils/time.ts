const dayjs = require('dayjs')
const duration = require('dayjs/plugin/duration')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(duration)

export type TimeToReturn = {
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}
export const timeTo = (timestamp: string): TimeToReturn => {
  const time = dayjs(timestamp)
  const now = dayjs()
  const diff = time.diff(now)
  const duration = dayjs.duration(diff)
  const months = duration.months()
  const weeks = duration.weeks()
  const days = duration.days()
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  return { months, weeks, days, hours, minutes, seconds }
}
