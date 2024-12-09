import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "pages/Home";
import Search from "pages/Search";
import Media from 'pages/Media'

function Router () {
    return (
        <div id="routes" style={styles.routes}>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/media/:id" element={<Media />} />
                {/* <Route path="/media/genre/:id" element={<Media />} /> */}
                <Route path="/media/:id/genre/:genreId" element={<Media />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    )
}

const styles = {
    routes: {
        minHeight: 'calc(100vh - 242px)',
    }
}
export default Router