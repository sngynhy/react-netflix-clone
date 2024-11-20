import React, {useState, useEffect} from 'react'
import Movie from 'components/Movie'

function Home () {
    const [loading, setLoading] = useState(true)
    const [movieList, setMovieList] = useState([])
    useEffect(() => { // api를 호출하여 데이터 가져올 시 한 번만 실행
        getMovieList()
    }, [])
    async function getMovieList () {
        const res = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year`)
        const json = await res.json()
        setMovieList(json.data.movies)
        setLoading(false)
    }
    return (
        <div>
            <h1>The Movies! {!loading && `(${movieList.length})`}</h1>
            { loading
                ? <strong>Loading...</strong>
                : <div>{movieList.map(movie => <Movie key={movie.id} id={movie.id} coverImg={movie.medium_cover_image} title={movie.title} summary={movie.summary} genres={movie.genres} />)}</div>
            }
        </div>
    )
}

export default Home