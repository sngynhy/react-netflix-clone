import Router from "./router";
import LoadingProvider from 'context/LoadingContext'
import LoadingOverlay from "components/ui/LoadingOverlay";
import Header from 'components/layout/Header';
import Footer from "./components/layout/Footer";

import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #000435;
    color: white;
`

function App() {
  return (
    // 📍 context 사용
    <LoadingProvider>
        {/* <LoadingOverlay /> */}
        <Wrapper>
          <Header/>
          <Router />
          <Footer />
        </Wrapper>
    </LoadingProvider>
  );
}

export default App;
