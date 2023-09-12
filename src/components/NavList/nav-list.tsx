import { useTrail, animated } from '@react-spring/web'
import styles from './nav-list.module.scss'
import logo from '../../assets/logo.png'
import { LINKS } from '../../config/NavPanel.config'
import { Link, useLocation } from 'react-router-dom';

type NavProps = {
  isOpen: boolean;
  handleToggle: () => void;
}

export default function NavList({ handleToggle, isOpen }: NavProps) {

  const { pathname } = useLocation();
  const trail = useTrail(LINKS.length,
    {
      from: { x: -300 },
      x: isOpen ? 0 : -300,
      config: { mass: 5, tension: 2000, friction: 160, clamp: true },
    },
  )

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {trail.map((style, index) => {
          const link = LINKS[index]
          const isActive = pathname === link.src ? true : false
          return (
            <animated.li className={styles.element} style={style} key={index}
              content={isActive ? '●' : ''} >
              <Link className={styles.link} to={link.src}
                onClick={handleToggle}>{link.name}</Link>
            </animated.li>
          )
        })}
      </ul>
      <img src={logo} alt='студия татуажа Илоны Измайловой'
        className={`${styles.image} ${isOpen ? styles.image_open : ''}`} />
    </div>
  )
}