import { useState, useEffect } from 'react'
import styles from './calendar-grid.module.scss'

export default function CalendarGrid({handleClickDate}: {handleClickDate(day: number): void}) {

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const DAYS_OF_THE_WEEK = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВСК']
  const MONTHS = ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ', 'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ']

  const today = new Date()
  const [date, setDate] = useState(today)
  const [day, setDay] = useState(date.getDate())
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date))

  useEffect(() => {
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setStartDay(getStartDayOfMonth(date))
  }, [date])

  function getStartDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  const days: number[] = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS
  const daysOfMonth: null[] = Array(days[month] + (startDay - 1)).fill(null)


  const handleClick = (day: number) => {
    return handleClickDate(day)
  }

  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <button className={styles.button} onClick={() => setDate(new Date(year, month - 1, day))}>&#10229;</button>
        <div>
          {MONTHS[month]} {year}
        </div>
        <button className={styles.button} onClick={() => setDate(new Date(year, month + 1, day))}>&#10230;</button>
      </div>
      <div className={styles.container}>
        {DAYS_OF_THE_WEEK.map(d => (
          <div className={styles.cell} key={d}>
            <strong>{d}</strong>
          </div>
        ))}
        {daysOfMonth.map((_, index) => {
          const d = index - (startDay - 2);
          const isToday = (d === today.getDate() && month === today.getMonth()) ? true : false
          /* const isSelected = d === day ? true : false */
          return (
            <div className={`${styles.cell} ${isToday && styles.today}`}
              key={index}
              onClick={() => handleClick(d)}
            >
              {d > 0 ? d : ''}
            </div>
          );
        })}
      </div>
    </div>
  )
}