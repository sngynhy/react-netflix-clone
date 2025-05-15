import Router from "./router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import styled from "styled-components";
import { LoadingProvider } from 'context/LoadingContext'
import { LoadingOverlay } from "components/common/LoadingOverlay";
import { Header } from 'components/common/Header';
import { Footer } from "./components/common/Footer";

export const Container = styled.div`
    background-color: black; // #000435;
    color: white;
    position: relative;
`
const queryClient = new QueryClient()

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* 📍 context 사용 */}
      <LoadingProvider>
          <LoadingOverlay />
          <Container>
            <Header />
            <Router />
            <Footer />
          </Container>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default App;
