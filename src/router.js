import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "pages/Home";
import Search from "pages/Search";
import Media from 'pages/Media'
import MyContents from "pages/MyContents";
import TrendingNow from "pages/TrendingNow";
import { ScrollToTop } from "components/common/ScrollTop";
import { useMediaStore } from "stores/mediaStore";
import styled from "styled-components";

function Router ({scrollTop}) {
    const { openDetailModal } = useMediaStore()
    return (
        <RoutesWrapper id="routes" $openDetailModal={openDetailModal}>
            <ScrollToTop />
            <Routes>
                <Route index element={<Home />} />
                <Route index path="/media/:mType" element={<Media scrollTop={scrollTop} />} />
                <Route path="/media/:mType/genre/:genreId" element={<Media scrollTop={scrollTop} />} />
                <Route path="/my-list" element={<MyContents />} />
                <Route path="/trending-now" element={<TrendingNow />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </RoutesWrapper>
    )
}
const RoutesWrapper = styled.div`
    min-height: calc(100vh - 242px);
    ${props => props.$openDetailModal && 'position: fixed;'}
`
export default Router