import Router from "./router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMediaStore } from "stores/mediaStore";
import styled from "styled-components";
import LoadingProvider from 'context/LoadingContext'
import LoadingOverlay from "components/common/LoadingOverlay";
import { Header } from 'components/common/Header';
import { Footer } from "./components/common/Footer";
import DetailModal from "components/modal/DetailModal";

export const Wrapper = styled.div`
    background-color: black; // #000435;
    color: white;
    position: relative;
`
const queryClient = new QueryClient()

function App() {
  const {openDetailModal} = useMediaStore()

  return (
    <QueryClientProvider client={queryClient}>
      {/* 📍 context 사용 */}
      <LoadingProvider>
          <LoadingOverlay />
          <Wrapper>
            <Header/>
            <Router/>
            {openDetailModal && <DetailModal />}
            <Footer />
          </Wrapper>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default App;
