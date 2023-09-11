import NavPanel from '../NavPanel/nav-panel'
import styles from './header.module.scss'
import NavPanelDesktop from '../NavPanelDesktop/nav-panel-desktop'
import { useLocation } from 'react-router-dom';

export default function Header () {

  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <NavPanel/>
      <NavPanelDesktop/>
      <div className={styles.container}>
        <p className={styles.title}>{pathname}</p>
      </div>
    </header>
  )
}