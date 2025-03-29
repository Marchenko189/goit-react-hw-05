import { useState, useEffect, Suspense } from "react";
import { Outlet, useParams, NavLink, useNavigate, useLocation} from "react-router";
import { fetchDetailMovies } from "../../moviesService";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => {
       navigate(location.state?.from?.pathname + location.state?.from?.search || "/movies");
    };

    useEffect(() => {
        async function getDetails() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchDetailMovies(movieId);
                setDetails(data);
            }
            catch {
                setError(true);
            }
            finally {
                setIsLoading(false);
            }
            
        }
        getDetails();
    }, [movieId]);


    return (
        <>
        {isLoading && <b className={css.loading}>Loading...</b>}
            {error && <b className={css.error}>Error...</b>}
                 {details &&
                <div className={css.container}>
            <button className={css.button} type="button" onClick={goBack} >
                Go back
                    </button>
                    <div className={css.container_cont}>
                      <img className={css.poster} src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} />
            <div>
            <h1 className={css.title}>{details.title}</h1>
            <p className={css.rating}>Rating: {details.vote_average}</p>
            <h2>Overview</h2>
            <p className={css.overview}>{details.overview}</p>
            <h2>Genres</h2>
            <div className={css.genres}>
                        {details.genres.map(genre => (
                            <p key={genre.id}>{genre.name}</p>
                        ))}
                    </div>
            <p className={css.releaseDate}>Release date: {details.release_date}</p>     
                    
                     <ul className={css.list}>
        <li className={css.item}>
          <NavLink to="cast" state={{ from: location.state?.from }} className={css.link}>Cast</NavLink>
        </li>
        <li className={css.item}>
          <NavLink to="reviews" state={{ from: location.state?.from }} className={css.link}>Reviews</NavLink>
        </li>
      </ul>    
            </div>
          
                        
                    </div>
                    
           
                </div>}
            <Suspense fallback={<b>Loading page...</b>}>
            <Outlet/>
            </Suspense>
           
        </>
    )
}

