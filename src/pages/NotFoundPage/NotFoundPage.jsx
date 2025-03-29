import { NavLink } from 'react-router';
import css from "./NotFoundPage.module.css"

export default function NotFoundPage() {
    return (
        <div>
            <h1 className={css.text}>
                404 Not Found! Please follow this {' '}
                <NavLink to="/"> link</NavLink>
            </h1>
        </div>
    );
}