import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { fetchMoviesCast } from "../../moviesService";
import css from "./MovieCast.module.css"


export default function MovieCast() {
    const { movieId } = useParams();
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        async function getCast() {
            const data = await fetchMoviesCast(movieId)
            setCasts(data);
        }
        getCast();
    }, [movieId]);

    return (
            <div className={css.container}>
            <ul className={css.list}>
        {casts.length > 0 &&
                casts.map((cast) => (
            
                    <li className={css.listItem} key={cast.id}>
                        <img className={css.image} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
                        <p className={css.text}>{cast.name}</p>
                        <p className={css.character}>Character:{cast.character}</p>
                </li>
        ))}
            </ul>
      
    </div>
    )
}