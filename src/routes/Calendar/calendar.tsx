import { useState } from 'react'
import CalendarGrid from '../../components/CalendarGrid/calendar-grid'
import Header from '../../components/Header/header'
import styles from './calendar.module.scss'

export default function Calendar() {

  const [activeButton, setActiveButton] = useState<string>('work-calendar')

  const setActiveWorkCalendar = () => {
    if (activeButton == 'work-calendar') {
      return
    }
    setActiveButton('work-calendar')
  }

  const setActiveClientEntries = () => {
    if (activeButton == 'client-entries') {
      return
    }
    setActiveButton('client-entries')
  }

  return (
    <>
      <Header />
      <section className={styles.content}>
        <div className={styles.head_buttons}>
          <button className={`${styles.button}
           ${activeButton == 'work-calendar' ? styles.button_active : ''}`}
            onClick={setActiveWorkCalendar}>
            Рабочие дни
          </button>
          <button className={`${styles.button}
           ${activeButton == 'client-entries' ? styles.button_active : ''}`}
            onClick={setActiveClientEntries}>
            Записи клиентов
          </button>
        </div>
        {activeButton == 'work-calendar' ?
          <CalendarGrid/>
          :
          <div>entries calendar</div>
        }
      </section>
    </>
  )
}