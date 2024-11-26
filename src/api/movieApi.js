import axios from 'axios'

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const API_TOKEN = process.env.REACT_APP_MOVIE_API_TOKEN
const BASE_URL = `https://api.themoviedb.org/3`
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_TOKEN
    }
}


const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ko`;
const NOWPLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`
const POPULAR_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=1`
const TOPRATED_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`
const NETFLIX_ORIGINAL = `${BASE_URL}/discover/tv?include_adult=false&api_key=${API_KEY}&with_networks=213&language=ko`

export const fetchGenres = async () => {
    const res = await axios.get(GENRE_URL, options);
    return res.data.genres;
}
export const fetchNowplaying = async () => {
    const res = await axios.get(NOWPLAYING_URL, options);
    return res.data.results;
}
export const fetchPopular = async () => {
    const res = await axios.get(POPULAR_URL, options);
    return res.data.results;
}
export const fetchToprated = async () => {
    const res = await axios.get(TOPRATED_URL, options);
    return res.data.results;
}

export const fetchNetflixOriginal = async () => {
    const res = await axios.get(NETFLIX_ORIGINAL, options);
    return res.data.results;
}