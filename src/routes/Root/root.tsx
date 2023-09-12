import styles from './root.module.scss'
import Header from '../../components/Header/header'

export default function Root() {
  return (
    <>
      <Header />
      <section className={styles.content}>

      </section>
    </>
  )
}

