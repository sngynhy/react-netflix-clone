import React, {useState, useEffect, useContext} from 'react'
import Movie from 'components/Movie'
import axios from 'axios'

import MovieContext from 'context/MovieContext'
import useLoading from 'hooks/useLoading'

function Home () {
    // 📍 custom hook 사용
    const { activeLoading, deactiveLoading } = useLoading();

    const [movieList, setMovieList] = useState([])

    // const { movieData } = useContext(MovieContext)

    useEffect(() => { // api를 호출하여 데이터 가져올 시 한 번만 실행
        console.log('useEffect')
        activeLoading()
        getMovieList()
    }, [])

    async function getMovieList () {
        const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`
        // const url = `https://yts.mx/api/v2/list_movies.json`
        await axios.get(url).then(res => setMovieList(res.data.data.movies))

        // const res = await fetch(url)
        // const json = await res.json()
        // setMovieList(json.data.movies)
        // setLoading(false)
        deactiveLoading()
    }

    return (
        <div>
            <h1>The Movies! {`(${movieList.length})`}</h1>
            <div>{movieList.map(movie => <Movie key={movie.id} id={movie.id} poster={movie.medium_cover_image} title={movie.title} summary={movie.summary} genres={movie.genres} />)}</div>
        </div>
    )
}

export default Home