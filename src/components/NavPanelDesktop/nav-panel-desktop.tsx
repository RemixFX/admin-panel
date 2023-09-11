import { Link, useLocation } from 'react-router-dom';
import { LINKS } from '../../config/NavPanel.config';
import styles from './nav-panel-desktop.module.scss'

export default function NavPanelDesktop() {

  const { pathname } = useLocation();

  return (
    <nav className={styles.navigation}>
      {LINKS.map((link) =>
        <Link to={link.src} key={link.name}
          className={`${styles.link} ${link.src === pathname ? styles.link_active : ''}`}>
          {link.name}
        </Link>
      )}
    </nav>
  )
}