import styles from './calendar-cell.module.scss'
import { useMutation } from '@apollo/client'
import { getClosedDays, setClosedDay, setOpenDay } from '../../api/closedDays'
import { useEffect, useState } from 'react'

interface CalendarCellProps {
  dayProps: {
    day: number
    monthOfDay: number
    yearOfDay: number
    id?: string
    isClosed: boolean
    isToday: boolean
  }
}

export default function CalendarCell({ dayProps }: CalendarCellProps) {

  const [animationState, setAnimationState] = useState<null | boolean>(null)

  const [closeDay, { data: responseCloseDay }] = useMutation(
    setClosedDay,
    { refetchQueries: [getClosedDays] }
  )
  const [openDay, { data: responseOpenDay }] = useMutation(
    setOpenDay,
    { refetchQueries: [getClosedDays] }
  )

  const handleClick = () => {
    if (!dayProps.isClosed) {
      closeDay({
        variables: {
          date: new Date(dayProps.yearOfDay, dayProps.monthOfDay, dayProps.day).toLocaleDateString()
        }
      })
    } else {
      openDay({
        variables: {
          id: dayProps.id!
        }
      })
    }
  }

  useEffect(() => {
    if (responseOpenDay?.deleteClosedDay.status && !dayProps.isClosed) {
      setAnimationState(true)
    }
    if (responseCloseDay?.setClosedDay.status && dayProps.isClosed) {
      setAnimationState(true)
    }
  }, [dayProps.isClosed, responseCloseDay?.setClosedDay.status, responseOpenDay?.deleteClosedDay.status])

  return (
    <div className={`
    ${styles.cell}
    ${dayProps.isToday ? styles.today : ''}
    ${dayProps.isClosed ? styles.closed : styles.open}
    ${(animationState && dayProps.isClosed) && styles.closed_animation}
    ${(animationState && !dayProps.isClosed) && styles.open_animation}
    ${dayProps.day <= 0 ? styles.inactive : ''}
    `}
      onClick={handleClick}
    >
      {dayProps.day > 0 ? dayProps.day : ''}
    </div>
  )
}

