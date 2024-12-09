import Router from "./router";
import styled from "styled-components";
// import LoadingProvider from 'context/LoadingContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/common/Header';
import Footer from "./components/common/Footer";
import LoadingOverlay from "components/ui/LoadingOverlay";
import { useGlobalStore } from "stores/CommonStore";

export const Wrapper = styled.div`
    background-color: black; // #000435;
    color: white;
    position: relative;
`
const queryClient = new QueryClient()

function App() {
  const {isLoading} = useGlobalStore()
  // console.log('isLoading', isLoading);
  return (
    <QueryClientProvider client={queryClient}>
      {/* 📍 context 사용 */}
      {/* <LoadingProvider> */}
          {isLoading ? <LoadingOverlay />
          : <Wrapper>
              <Header/>
              <Router />
              <Footer />
            </Wrapper>}
      {/* </LoadingProvider> */}
    </QueryClientProvider>
  );
}

export default App;
