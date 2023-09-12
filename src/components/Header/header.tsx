import NavPanel from '../NavPanel/nav-panel'
import styles from './header.module.scss'
import NavPanelDesktop from '../NavPanelDesktop/nav-panel-desktop'
import { useLocation } from 'react-router-dom';
import { LINKS } from '../../config/NavPanel.config';

export default function Header() {

  const { pathname } = useLocation();
  const title = LINKS.find((link) => link.src === pathname)

  return (
    <header className={styles.header}>
      <NavPanel />
      <NavPanelDesktop />
      <div className={styles.container}>
        <p className={styles.title}>{title?.name}</p>
      </div>
    </header>
  )
}