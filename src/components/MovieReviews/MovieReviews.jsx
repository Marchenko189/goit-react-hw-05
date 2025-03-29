import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieReviews } from "../../moviesService";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function getReviews() {
            const data = await fetchMovieReviews(movieId)
            setReviews(data);
        }
        getReviews();
    }, [movieId]); 

    return (
        <div className={css.container}>
            <ul className={css.list}>
                {reviews.length > 0 &&
                    reviews.map((review) => (
                        <li className={css.listItem} key={review.id}>
                            <p className={css.name}>{review.author}</p>
                            <p className={css.reviews}>{review.content}</p>
                    </li>
                ))}
            </ul>  
        </div>
    )
}