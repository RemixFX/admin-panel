import CalendarGrid from '../../components/CalendarGrid/calendar-grid'
import Header from '../../components/Header/header'
import styles from './calendar.module.scss'

export default function Calendar() {


  const handleClickDate = (day: number) => {
    console.log(day)
  }

  return (
    <>
      <Header />
      <section className={styles.content}>
        <CalendarGrid handleClickDate={handleClickDate}/>
      </section>
    </>
  )
}