import { useState, useEffect, useCallback, } from 'react'
import styles from './calendar-grid.module.scss'
import { useQuery } from '@apollo/client'
import { getClosedDays } from '../../api/closedDays'
import CalendarCell from '../CalendarCell/calendar-cell'
import Loader from '../Loader/loader'

export default function CalendarGrid() {

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

  const { loading, data, error } = useQuery(getClosedDays, { variables: { month: month + 1 }, fetchPolicy: 'network-only' })

  useEffect(() => {
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setStartDay(getStartDayOfMonth(date))
  }, [date])

  function getStartDayOfMonth(date: Date) {
    let dayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    if (dayOfWeek === 0) {
      dayOfWeek = 7
    }
    return dayOfWeek
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  const days: number[] = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS
  const daysOfMonth: null[] = Array(days[month] + (startDay - 1)).fill(null)


  const checkClosedDay = useCallback((day: number): boolean => {
    if (!data) return false
    return data.getClosedDaysForAdmin.some(item => new Date(Number(item.date)).getDate() === day)
  }, [data])

  const checkIdClosedDay = useCallback((day: number): string | undefined => {
    if (!data) return undefined
    return data.getClosedDaysForAdmin.find(item => new Date(Number(item.date)).getDate() === day)?.id
  }, [data])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className={`${styles.frame} ${error ? styles.frame_error : ''}`}>
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
            const day = index - (startDay - 2)
            return (
              <CalendarCell
                key={index}
                dayProps={{
                  day,
                  monthOfDay: month,
                  yearOfDay: year,
                  id: checkIdClosedDay(day),
                  isClosed: checkClosedDay(day),
                  isToday: day === today.getDate() && month === today.getMonth()
                }}
              />)
          })}
        </div>
      </div>
      {error && <div className={`${styles.frame} ${styles.error}`}>
        Не удалось получить данные с сервера
      </div>}
    </>
  )
}