import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../../../api/movieApi';

function DetailModal (props) {
    const { id } = useParams()
    const location = useLocation()

    return (
        <div>
        </div>
    )
}

export default DetailModal