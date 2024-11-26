import React, {useState, useEffect, useContext, useRef} from 'react'
import Movie from 'components/Movie'
import axios from 'axios'
import useLoading from 'hooks/useLoading'

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const API_TOKEN = process.env.REACT_APP_MOVIE_API_TOKEN
const BASE_URL = `https://api.themoviedb.org/3`;

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + API_TOKEN
    }
}
const NOWPLAYING_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1`

function Home () {
    // 📍 custom hook 사용
    const { activeLoading, deactiveLoading } = useLoading();
    const [movieList, setMovieList] = useState([])
    
    const hasFetched = useRef(false); // StrictMode로 인해 렌더링이 2번 실행되어 api가 두번 호출되는 것을 방지
    useEffect(() => { 
        activeLoading()
        if (!hasFetched.current) {
            hasFetched.current = true; // 실행 상태를 기록
            getMovieList();
        }
    }, [])
    
    const [nowPlaying, setNowPlaying] = useState([])
    async function getMovieList () {
        try {
            await axios.get(NOWPLAYING_URL, options).then(res => setNowPlaying(res.data.results))
        } catch (err) {
            console.log('API 호출 실패', err)
        } finally {
            deactiveLoading()
        }
    }

    return (
        <div>
            <h1>현재 상영작 {`(${nowPlaying.length})`}</h1>
            <div>
                {
                    nowPlaying.map(movie => {
                    return <Movie
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        originTitle={movie.original_title}
                        overview={movie.overview}
                        poster={movie.poster_path}
                        genre={movie.genre_ids}
                        voteAvg={movie.vote_average}
                        voteCnt={movie.vote_count} />
                    })
                }
            </div>
        </div>
    )
}

export default Home