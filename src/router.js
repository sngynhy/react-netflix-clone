import React from "react";
import {Routes, Route} from 'react-router-dom'
// import Home from 'pages/Home'
import MovieDetail from "pages/MovieDetail";
import Main from "./pages/Main";

function Router () {
    return (
        <div>
            <Routes>
                {/* <Route index element={<Home />} /> */}
                <Route index element={<Main />} />
                <Route path="/movie-detail/:id" element={<MovieDetail />} />
                <Route path="/movie-detail" element={<MovieDetail />} />
            </Routes>
        </div>
    )
}

export default Router