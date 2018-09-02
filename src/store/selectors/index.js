import moment from 'moment'

const format = 'DD/MM/YYYY'

const parseTime = (date, time) => {
  const [hours, minutes] = time.split(' ')[0].split(':')

  return date.hours(hours).minutes(minutes)
}

const sortRemindersByTime = (a, b) => {
  const aDate = moment(a.date, format)
  const aStart = parseTime(aDate, a.start)
  const aEnd = parseTime(aDate, a.end)
  const bDate = moment(b.date, format)
  const bStart = parseTime(bDate, b.start)
  const bEnd = parseTime(bDate, b.end)

  return aStart.isBefore(bStart)
    ? -1
    : aStart.isSame(bStart)
      ? aEnd.isBefore(bEnd)
        ? -1
        : 1
      : 1
}

export const getCurrentMonth = (data) => data.list.find((item) => 
  (item.month === data.month && item.year === data.year)
).monthObject || [] 

export const getReminders = (date, state) => state
  .filter((item) => (item.date === date)) 
  .sort(sortRemindersByTime)
