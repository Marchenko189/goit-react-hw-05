import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchSearchMovies } from "../../moviesService";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css"

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTitle = searchParams.get('query') ?? '';
    const [query, setQuery] = useState(searchTitle);

    useEffect(() => {
        setQuery(searchTitle);
    }, [searchTitle]);

    const handleInputChange = (event) => {
        setQuery(event.target.value); 
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!query.trim()) {
            alert("The field cannot be empty.");
            return;
        }
        setMovies([]);
        setSearchParams({ query: query.trim() });
        setTimeout(() => setQuery(''), 5);
    };

    useEffect(() => {
         if (!searchTitle) return;

        async function getMovies() {
            try {
                setIsLoading(true);
                setError(false);
                const data = await fetchSearchMovies(searchTitle);
                setMovies(data);
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        getMovies();
    }, [searchTitle]);

    return (
        <div className={css.container}> 
            <h1>Movies</h1>
            <form className={css.form} onSubmit={handleFormSubmit}>
                <input className={css.input} type="text" value={query} onChange={handleInputChange} />
                <button className={css.button} type="submit">Search</button>
            </form>
            {isLoading && <b className={css.loading}>Loading...</b>}
            {error && <b className={css.error}>Error loading movies...</b>}
            {movies.length > 0 && <MovieList trends={movies} />}
        </div>
    );
}