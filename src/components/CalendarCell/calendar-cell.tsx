import { useState } from 'react'
import styles from './calendar-cell.module.scss'

interface CalendarCellProps {
  day: number
  isToday: boolean
  closedDays: number[]
  handleClickDate: (day: number) => void
}

export default function CalendarCell({day, isToday, closedDays, handleClickDate}: CalendarCellProps) {

  const [isOpen, setIsOpen] = useState<boolean>(() => !closedDays.includes(day))
  const handleClick = (day: number) => {
    setIsOpen(!isOpen)
    handleClickDate(day)
  }

  return (
    <div className={`
    ${styles.cell}
    ${isToday ? styles.today : ''}
    ${isOpen ? styles.open : styles.closed}
    ${day <= 0 ? styles.inactive : ''}
    `}
      onClick={() => handleClick(day)}
    >
      {day > 0 ? day : ''}
    </div>
  )
}

