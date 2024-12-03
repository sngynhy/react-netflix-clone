import Router from "./router";
import styled from "styled-components";
import LoadingProvider from 'context/LoadingContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/layout/common/Header';
import Footer from "./components/layout/common/Footer";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { useEffect, useState } from "react";

export const Wrapper = styled.div`
    background-color: black; // #000435;
    color: white;
    position: relative;
`
const queryClient = new QueryClient()

function App() {
    // const [isScrollingDown, setIsScrollingDown] = useState(false);
    // const [lastScrollY, setLastScrollY] = useState(0);
    // const handleScrollY = () => {
    //     const currentScrollY = window.scrollY
    //     console.log('currentScrollY', currentScrollY);
    //     if (currentScrollY > lastScrollY) {
    //         // 스크롤이 아래로 이동
    //         setIsScrollingDown(true);
    //       } else {
    //         // 스크롤이 위로 이동
    //         setIsScrollingDown(false);
    //       }
    //       setLastScrollY(currentScrollY); // 마지막 스크롤 위치 갱신
    // }
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScrollY);

    //     return (
    //         window.removeEventListener("scroll", handleScrollY)
    //     )
    // }, [lastScrollY])
    
  return (
    <QueryClientProvider client={queryClient}>
      {/* 📍 context 사용 */}
      <LoadingProvider>
          {/* <LoadingOverlay /> */}
          <Wrapper>
            <Header/>
            <Router />
            <Footer />
          </Wrapper>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default App;
