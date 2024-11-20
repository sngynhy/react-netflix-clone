import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function MovieDetail (props) {
    const { id } = useParams()
    const [movie, setMovie] = useState({})
    useEffect(() => {
        getMovieDetail()
    }, [])
    async function getMovieDetail () {
        const res = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        const json = await res.json()
        setMovie(json.data)
    }
    console.log(movie)
    return (
        <div>detail</div>
    )
}

export default MovieDetail