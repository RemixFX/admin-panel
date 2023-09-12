import Header from '../../components/Header/header'
import styles from './calendar.module.scss'

export default function Calendar () {
  return(
    <section className={styles.content}>
      <Header/>
      Календарь
    </section>
  )
}