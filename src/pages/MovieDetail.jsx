import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../api/movieApi';

function MovieDetail (props) {
    const { id } = useParams()
    const location = useLocation()

    // const [movie, setMovie] = useState({})
    // const [genres, setGenres] = useState([])
    
    const {data, isLoading, error} = useQuery({ queryKey: ['genre'], queryFn: fetchGenres })
    // setGenres(prev => [...prev, data])
    
    return (
        <div>
        </div>
    )
}

export default MovieDetail