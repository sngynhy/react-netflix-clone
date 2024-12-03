import axios from 'axios'

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const API_TOKEN = process.env.REACT_APP_MOVIE_API_TOKEN
const BASE_URL = `https://api.themoviedb.org/3`
const QUERY_PARAM = `api_key=${API_KEY}&include_adult=false&language=ko&page=1` 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_TOKEN
    }
}

// URL
const url = {
    genre: `${BASE_URL}/genre/movie/list?include_adult=false&api_key=${API_KEY}&language=ko`,
    movie: {
        nowPlaying: `${BASE_URL}/movie/now_playing?${QUERY_PARAM}`,
        popular: `${BASE_URL}/movie/popular?${QUERY_PARAM}`,
        topRated: `${BASE_URL}/movie/top_rated?${QUERY_PARAM}`,
        upcomming: `${BASE_URL}/movie/upcoming?${QUERY_PARAM}`
    },
    tv: {
        airingToday: `${BASE_URL}/tv/airing_today?${QUERY_PARAM}`, 
        onTheAir: `${BASE_URL}/tv/on_the_air?${QUERY_PARAM}`,
        popular: `${BASE_URL}/tv/popular?${QUERY_PARAM}`,
        topRated: `${BASE_URL}/tv/top_rated?${QUERY_PARAM}`
    },
    netflixOriginal: `${BASE_URL}/discover/tv?with_networks=213&${QUERY_PARAM}`,
    trending: {
        all: `${BASE_URL}/trending/all/week?${QUERY_PARAM}`,
        movies: `${BASE_URL}/trending/movie/week?${QUERY_PARAM}`,
        tv: `${BASE_URL}/trending/tv/week?${QUERY_PARAM}`
    }
}

// 장르 리스트
export const fetchGenres = async () => {
    const res = await axios.get(url.genre, options);
    return res.data.genres;
}
// 영화 데이터
export const fetchNowplayingMovie = async () => {
    const res = await axios.get(url.movie.nowPlaying, options);
    return res.data.results;
}
export const fetchPopularMovie = async () => {
    const res = await axios.get(url.movie.popular, options);
    return res.data.results;
}
export const fetchTopratedMovie = async () => {
    const res = await axios.get(url.movie.topRated, options);
    return res.data.results;
}
export const fetchUpcommingMovie = async () => {
    const res = await axios.get(url.movie.upcomming, options);
    return res.data.results;
}
// TV 시리즈 데이터
export const fetchAiringTodayTV = async () => {
    const res = await axios.get(url.tv.airingToday, options);
    return res.data.results;
}
export const fetchOnTheAirTV = async () => {
    const res = await axios.get(url.tv.onTheAir, options);
    return res.data.results;
}
export const fetchPopularTV = async () => {
    const res = await axios.get(url.tv.popular, options);
    return res.data.results;
}
export const fetchTopratedTV = async () => {
    const res = await axios.get(url.tv.topRated, options);
    return res.data.results;
}

// 넷플릭스 오리지널
export const fetchNetflixOriginal = async () => {
    const res = await axios.get(url.netflixOriginal, options);
    return res.data.results;
}
// Trending

// 동영상
export const fetchVideo = async ({ queryKey }) => { // 🍰 파라미터로 영화/시리즈 구분인자 받기
    const [, id] = queryKey
    const VIDEO_URL = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=ko`
    const res = await axios.get(VIDEO_URL, options);
    return res.data.results
}
// 검색어 조회
export const fetchSearchBykeyword = async ({ queryKey }) => {
    const [, keyword] = queryKey
    
    const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie?${QUERY_PARAM}&query=${keyword}`
    const SEARCH_TV_URL = `${BASE_URL}/search/tv?${QUERY_PARAM}&query=${keyword}`
    const SEARCH_PERSON_URL = `${BASE_URL}/search/person?${QUERY_PARAM}&query=${keyword}`
    
    const movie = await axios.get(SEARCH_MOVIE_URL, options);
    const tv = await axios.get(SEARCH_TV_URL, options);
    const person = await axios.get(SEARCH_PERSON_URL, options);

    let res = {
        movie: movie.data.results,
        tv: tv.data.results,
        person: person.data.results
    }
    return res
}
// 장르로 검색
export const fetchSearchByGenre = async ({ queryKey }) => {
    const [, keyword, queryClient] = queryKey
    const genres = queryClient.getQueryData(['genres']);

    // 입력한 장르의 id 추출
    const id = 0 // includes로 처리
    
    const SEARCH_GENRE_URL = `${BASE_URL}/discover/movie?${QUERY_PARAM}&with_genres=${id}`
    
    const res = await axios.get(SEARCH_GENRE_URL, options);
    return res.data.results
}
