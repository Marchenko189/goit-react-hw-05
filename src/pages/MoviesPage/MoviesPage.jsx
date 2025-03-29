import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { fetchSearchMovies } from "../../moviesService";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css"

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTitle = searchParams.get('query') ?? '';
    const [debounceQuery] = useDebounce(searchTitle, 300);

    const changeSearchText = (event) => {
    const nextParams = new URLSearchParams(searchParams);

    if (event.target.value !== '') {
      nextParams.set('query', event.target.value);
    } else {
      nextParams.delete('query');
    }

    setSearchParams(nextParams);
  };

    useEffect(() => {
         if (!debounceQuery) return;

        async function getMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchSearchMovies(debounceQuery);
                setMovies(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getMovies();
    }, [debounceQuery]);

    return (
        <div className={css.container}> 
            <h1>Movies</h1>
          
              <input className={css.input} type="text" value={searchTitle} onChange={changeSearchText} />
                {/* <button className={css.button} type="submit">Search</button>   */}
          
            {isLoading && <b className={css.loading}>Loading...</b>}
            {error && <b className={css.error}>Error loading movies...</b>}
            {movies.length > 0 && <MovieList trends={movies} />}
        </div>
    );
}