import React from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Home from 'pages/Home'
import MovieDetail from "pages/MovieDetail";

function Router () {
    return (
        <div>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
        </div>
    )
}

export default Router