import Router from "./router";
import styled from "styled-components";
import LoadingProvider from 'context/LoadingContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from 'components/layout/Header';
import Footer from "./components/layout/Footer";
import LoadingOverlay from "components/ui/LoadingOverlay";

export const Wrapper = styled.div`
    background-color: #000435;
    color: white;
`
const queryClient = new QueryClient()

function App() {
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
