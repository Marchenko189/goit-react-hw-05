import { NavLink, useLocation} from "react-router";
import css from "./MovieList.module.css"

export default function MovieList({ trends }) {
    const location = useLocation();

    return (
        <div>
            <ul className={css.list}>
                {trends.length > 0 && trends.map((trend) => (
                    <li className={css.listItem} key={trend.id}>
                        <NavLink
                            to={`/movies/${trend.id}`}
                            state={{ from: location.state?.from || { pathname: location.pathname, search: location.search } }}
                            className={css.link}>
                         {trend.title}
                        </NavLink>
                
                </li>
                ))}
            </ul>
        </div>
    )
}