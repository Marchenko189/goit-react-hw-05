import { useEffect, useState } from "react";
import { fetchTrendMovies } from "../../moviesService";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css"

export default function HomePage() {
    const [trends, setTrends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getTrendMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchTrendMovies();
                setTrends(data);
            }
            catch {
                setError(true);
            }
            finally {
                setIsLoading(false);
            }
        }
        getTrendMovies();
    }, []);

    return (
        <div className={css.container}>
            <h1>Trending today</h1>
        {isLoading && <b className={css.loading}>Loading...</b>}
        {error && <b>Whoops there was an error, plz reload the page...</b>}
        { trends.length > 0 && <MovieList trends={trends} />}
        </div>
       
    )
}