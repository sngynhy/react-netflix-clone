import React from "react";
import {Routes, Route, createHashRouter, useLocation} from 'react-router-dom'
import Home from "pages/Home";
import Search from "pages/Search";
import Media from 'pages/Media'
import MyContents from "pages/MyContents";
import TrendingNow from "pages/TrendingNow";
import { ScrollToTop } from "components/common/ScrollTop";
import { useMediaStore } from "stores/mediaStore";
import styled from "styled-components";
import { SearchModal } from "components/modal/SearchModal";

function Router ({scrollTop}) {
    const { openDetailModal } = useMediaStore()
    const location = useLocation()

    // 이전 위치 확인
    const state = location.stateconst
    const backgroundLocation = state && state.background

    return (
        <RoutesWrapper id="routes" $openDetailModal={openDetailModal}>
            <ScrollToTop />
            <Routes location={backgroundLocation || location}>
                <Route index element={<Home />} />
                <Route index path="/media/:mType" element={<Media scrollTop={scrollTop} />} />
                <Route path="/media/:mType/genre/:genreId" element={<Media scrollTop={scrollTop} />} />
                <Route path="/my-list" element={<MyContents />} />
                <Route path="/trending-now" element={<TrendingNow />} />
                <Route path="/search" element={<Search />} />
                {/* <Route path="/search/:condition/:id" element={<SearchModal />} /> */}
            </Routes>

            {/* 모달 라우트 */}
            {backgroundLocation && (
                <Routes>
                    <Route path="/search/:condition" element={<SearchModal />} />
                </Routes>
            )}
        </RoutesWrapper>
    )
}
const RoutesWrapper = styled.div`
    min-height: calc(100vh - 242px);
    width: 100%;
    ${props => props.$openDetailModal && 'position: fixed;'}
`

// const router = createHashRouter([
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

// export default router
export default Router