import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom'

function MovieDetail (props) {
    const { id } = useParams()
    const location = useLocation()

    const [movie, setMovie] = useState({})
    useEffect(() => {
        getMovieDetail()
    }, [])
    async function getMovieDetail () {
        // const res = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        // const json = await res.json()
        // setMovie(json.data.movie)
        setMovie(location.state)
    }
    console.log(movie)
    return (
        <div>
            <img src={movie.poster} />
            <h1>{movie.title}</h1>
            <p>{movie.summary}</p>
            {movie.genres && <ul>{movie.genres.map(g => <li key={g}>{g}</li>)}</ul>}
            {/* {<img src={movie.large_cover_image} />}
            <h1>{movie.title_long}</h1>
            <p>runtime: {movie.runtime}</p>
            <p>{movie.summary}</p>
            {movie.genres && <ul>{movie.genres.map(g => <li key={g}>{g}</li>)}</ul>} */}
        </div>
    )
}

export default MovieDetail