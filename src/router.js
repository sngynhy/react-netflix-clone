import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from 'pages/Home'
import MovieDetail from "pages/MovieDetail";

function Router () {
    return (
        <div>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/movie-detail/:id" element={<MovieDetail />} />
                <Route path="/movie-detail" element={<MovieDetail />} />
            </Routes>
        </div>
    )
}

export default Router