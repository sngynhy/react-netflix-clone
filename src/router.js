import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "pages/Home";
import Search from "pages/Search";
import Media from 'pages/Media'
import MyContents from "pages/MyContents";
import TrendingNow from "pages/TrendingNow";
import { ScrollToTop } from "components/common/ScrollTop";

function Router ({scrollTop}) {
    return (
        <div id="routes" style={styles.routes}>
            <ScrollToTop />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/media/:mType" element={<Media scrollTop={scrollTop} />} />
                <Route path="/media/:mType/genre/:genreId" element={<Media scrollTop={scrollTop} />} />
                <Route path="/my-list" element={<MyContents />} />
                <Route path="/trending-now" element={<TrendingNow />} />
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