import React from "react";
import {Routes, Route, useLocation} from 'react-router-dom'
import styled from "styled-components";
import Home from "pages/Home";
import Search from "pages/Search";
import Media from 'pages/Media'
import MyContents from "pages/MyContents";
import TrendingNow from "pages/TrendingNow";
import Error from "pages/Error";
import { ScrollToTop } from "components/common/ScrollTop";
import { useMediaStore } from "stores/mediaStore";
import { SearchModal } from "components/modal/SearchModal";
import { DetailModal } from "components/modal/DetailModal";

function Router () {
    const { openModal } = useMediaStore()
    const location = useLocation()
    // 이전 위치 확인
    const state = location.state
    const backgroundLocation = state?.background
    // console.log('state', state);
    // console.log('backgroundLocation', backgroundLocation);
    return (
        <RoutesWrapper id="routes">
            <ScrollToTop />
            <div style={{position: openModal ? 'fixed' : '', width: '100%'}}>
                <Routes location={backgroundLocation || location}>
                    <Route index element={<Home />} />
                    <Route index path="/media/:mType" element={<Media />} />
                    <Route path="/media/:mType/genre/:genreId" element={<Media />} />
                    <Route path="/my-list" element={<MyContents />} />
                    <Route path="/trending-now" element={<TrendingNow />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/:not-found" element={<Error />} />
                </Routes>
            </div>

            {/* 모달 라우트 */}
            {backgroundLocation && (
                <Routes>
                    <Route path="/search/:condition" element={<SearchModal />} />
                    <Route path="/:page/detail" element={<DetailModal />} />
                    <Route path="/:page/:mType/detail" element={<DetailModal />} />
                </Routes>
            )}
        </RoutesWrapper>
    )
}
const RoutesWrapper = styled.div`
    min-height: calc(100vh - 242px);
    width: 100%;
`

// export const router = createHashRouter([
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             {
//                 path: '',
//                 element: <Home />
//             }
//         ]
//     }
// ])

export default Router