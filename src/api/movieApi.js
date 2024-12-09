import axios from 'axios'

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const API_TOKEN = process.env.REACT_APP_MOVIE_API_TOKEN
// const BASE_URL = process.env.REACT_APP_MOVIE_BASE_FETCH
const BASE_URL = `https://api.themoviedb.org/3`
const QUERY_PARAM = `api_key=${API_KEY}&include_adult=false&language=ko&page=1` 

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_TOKEN
    }
}

// 장르
export const fetchGenres = async ({ queryKey }) => { // type: 'movie' or 'tv'
    const [, type] = queryKey
    const url = `${BASE_URL}/genre/${type}/list?${QUERY_PARAM}`
    const res = await axios.get(url, options)
    return res.data.genres
}
// 컨텐츠 상세 정보
export const fetchContentDetails = async ({ queryKey }) => {
    const [, type, id] = queryKey
    const url = `${BASE_URL}/${type}/${id}?${QUERY_PARAM}`
    const res = await axios.get(url, options);
    return res.data
}
// 출연진 캐스팅 정보
export const fetchCreditDetails = async ({ queryKey }) => {
    const [, type, id] = queryKey
    const url = `${BASE_URL}/${type}/${id}/credits?language=ko`
    const res = await axios.get(url, options)
    return res.data
}
// 영화, 시리즈 컨텐츠
export const fetchContents = async ({ queryKey }) => { // type: 'movie' or 'tv', content: 'nowplaying', 'airingToday', ...
    const [, type, content] = queryKey
    const url = `${BASE_URL}/${type}/${content}?${QUERY_PARAM}`
    const res = await axios.get(url, options)
    return res.data.results
}
// 넷플릭스 오리지널
export const fetchNetflixOriginal = async () => {
    const url = `${BASE_URL}/discover/tv?with_networks=213&${QUERY_PARAM}`
    const res = await axios.get(url, options)
    return res.data.results
}
// 유사 컨텐츠
export const fetchSimilarContents = async ({ queryKey }) => { // type: 'movie' or 'tv'
    const [, type, id] = queryKey
    const url = `${BASE_URL}/${type}/${id}/similar?${QUERY_PARAM}`
    const res = await axios.get(url, options);
    return res.data.results
}
// 추천 컨텐츠
export const fetchRecommendContents = async ({ queryKey }) => { // type: 'movie' or 'tv'
    const [, type, id] = queryKey
    const url = `${BASE_URL}/${type}/${id}/recommendations?${QUERY_PARAM}`
    const res = await axios.get(url, options);
    return res.data.results
}
// 트렌드 컨텐츠
export const fetchTrendingContents = async ({ queryKey }) => { // type: 'all' or 'movie' or 'tv', period: 'week' or 'day'
    const [, type, period] = queryKey
    const url = `${BASE_URL}/trending/${type}/${period}?${QUERY_PARAM}`
    const res = await axios.get(url, options)
    return res.data.results
}

// 동영상
export const fetchVideo = async ({ queryKey }) => { // type: 'movie' or 'tv'
    const [, type, id] = queryKey
    const VIDEO_URL = `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=ko`
    const res = await axios.get(VIDEO_URL, options);
    return res.data.results
}
// 검색어 조회
export const fetchSearchBykeyword = async ({ queryKey }) => {
    const [ , type, keyword] = queryKey
    const url = `${BASE_URL}/search/${type}?${QUERY_PARAM}&query=${keyword}`
    const res = await axios.get(url, options);
    return res.data.results
}

// 장르로 검색
export const fetchSearchByGenre = async ({ queryKey }) => {
    const [, type, genreId] = queryKey
    console.log('fetchSearchByGenre', type, genreId);
                                    // multi
    const url = `${BASE_URL}/discover/${type}?${QUERY_PARAM}&with_genres=${genreId}`
    
    const res = await axios.get(url, options);
    return res.data.results
}
