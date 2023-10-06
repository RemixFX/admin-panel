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

  const [animationState, setAnimationState] = useState<null | string>(null)

  const [closeDay, { data: responseCloseDay, loading: closeLoading }] = useMutation(
    setClosedDay,
    { refetchQueries: [getClosedDays] }
  )
  const [openDay, { data: responseOpenDay, loading: openLoading }] = useMutation(
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

/* if (dayProps.day === 5) console.log(animationState, responseCloseDay?.setClosedDay.status, responseOpenDay?.deleteClosedDay.status )

  useEffect(() => {
    if (responseCloseDay?.setClosedDay.status === 'closed' && dayProps.isClosed === false) {
      setAnimationState('closed')
    }
    if (responseOpenDay?.deleteClosedDay.status === 'open' && dayProps.isClosed === true) {
      setAnimationState('open')
    }
  }, [dayProps.isClosed, responseCloseDay, responseOpenDay]) */

  return (
    <div className={`
    ${styles.cell}
    ${dayProps.isToday ? styles.today : ''}
    ${dayProps.isClosed ? styles.closed : styles.open}

    ${dayProps.day <= 0 ? styles.inactive : ''}
    `}
      onClick={handleClick}
    >
      {dayProps.day > 0 ? dayProps.day : ''}
    </div>
  )
}

