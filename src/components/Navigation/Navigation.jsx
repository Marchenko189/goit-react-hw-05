import { NavLink } from 'react-router';
import css from './Navigation.module.css';


export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
            <NavLink to="/" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
              Home
            </NavLink>
            <NavLink to="/movies"className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>
              Movies
            </NavLink>
      </nav>
    </header>
  );
}
