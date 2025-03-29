import axios from 'axios';

const options = {
headers: {
Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTQ3ZjM0YjM0ZWY0ZWVmZTVhOTA5M2U1OTNmYTI0YSIsIm5iZiI6MTc0Mjg5NTkxNy40NCwic3ViIjoiNjdlMjdiMmQ3ZGI5ZTcwYzQ3ZGM3MGU4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.u3fz-_0cH_ZJYDasehCazoPp7h2JBZROD2dvhLf7vko'
    }
};


export const fetchTrendMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
    return response.data.results;
}

export const fetchDetailMovies = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, options);
    return response.data;
}

export const fetchSearchMovies = async (query) => {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            query: encodeURIComponent(query),
        },
        headers: options.headers,
    });
    return response.data.results;
};

export const fetchMoviesCast = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, options);
    return response.data.cast;
}

export const fetchMovieReviews = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, options);
    return response.data.results;
}