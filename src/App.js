import Router from "./router";
import styled from "styled-components";
// import LoadingProvider from 'context/LoadingContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/common/Header';
import Footer from "./components/common/Footer";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { useGlobalStore } from "stores/CommonStore";
import { useMediaStore } from "stores/CommonStore";
import { useEffect, useRef } from "react";
import DetailModal from "components/modal/DetailModal";

export const Wrapper = styled.div`
    background-color: black; // #000435;
    color: white;
    position: relative;
`
const queryClient = new QueryClient()

function App() {
  const {isLoading} = useGlobalStore()
  const {mediaType, contentId, openDetailModal, setOpenDetailModal} = useMediaStore()
  
  const detailModalRef = useRef(null)
  useEffect(() => {
      // 특정 영역 외 클릭 시 이벤트 발생
    const outSideClick = (e) => {
          if (detailModalRef.current && !detailModalRef.current.contains(e.target)) {
              setOpenDetailModal(false)
          }
      }
      // 이벤트 리스너에 outSideClick 함수 등록
      document.addEventListener("mousedown", outSideClick);
      return () => { document.removeEventListener("mousedown", outSideClick); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailModalRef])

  return (
    <QueryClientProvider client={queryClient}>
      {/* 📍 context 사용 */}
      {/* <LoadingProvider> */}
          {isLoading ? <LoadingOverlay />
          : <Wrapper>
              <Header/>
              <Router/>
              {openDetailModal && <div id="detail-modal" ref={detailModalRef}><DetailModal id={contentId} mType={mediaType} /></div>}
              <Footer />
            </Wrapper>}
      {/* </LoadingProvider> */}
    </QueryClientProvider>
  );
}

export default App;
