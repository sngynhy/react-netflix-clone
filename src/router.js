import React, { useEffect } from "react";
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import styled from "styled-components";
import Home from "pages/Home";
import Search from "pages/Search";
import Media from 'pages/Media'
import MyContents from "pages/MyContents";
import TrendingNow from "pages/TrendingNow";
import NotFound from "pages/NotFound";
import { useMediaStore } from "stores/mediaStore";
import { SearchModal } from "components/modal/SearchModal";
import { DetailModal } from "components/modal/DetailModal";

function Router () {
    const { setIsModalOpen } = useMediaStore()
    const location = useLocation()

    // 이전 위치 확인
    const state = location.state
    const backgroundLocation = state?.background

    // 모달 여부 확인
    const isModalOpen = location.pathname.startsWith('/detail') || location.pathname.startsWith('/search/')

    useEffect(() => {
        setIsModalOpen(isModalOpen)
    }, [isModalOpen, setIsModalOpen])

    return (
        <RoutesWrapper id="routes">
            <div style={{position: isModalOpen ? 'fixed' : '', width: '100%', backgroundColor: 'black', height: '100%'}}>
                <Routes location={backgroundLocation || location}>
                    <Route index element={<Home />} />
                    <Route path="/media" element={<Navigate to="/media/movie" replace />} />
                    <Route path="/media/:mType" element={<Media />} />
                    <Route path="/media/:mType/genre/:genreId" element={<Media />} />
                    <Route path="/my-list" element={<MyContents />} />
                    <Route path="/trending-now" element={<TrendingNow />} />
                    <Route path="/search" element={<Search />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>

            {/* 모달 라우트 */}
            {backgroundLocation && (
                <Routes>
                    <Route path="/search/md/:condition" element={<SearchModal />} />
                    <Route path="/detail" element={<DetailModal />} />
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