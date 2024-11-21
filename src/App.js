import Router from "./router";

import LoadingProvider from 'context/LoadingContext'
import LoadingOverlay from "components/ui/LoadingOverlay";

function App() {
  return (
    // 📍 context 사용
    <LoadingProvider>
        <LoadingOverlay />
        <Router />
    </LoadingProvider>
  );
}

export default App;
