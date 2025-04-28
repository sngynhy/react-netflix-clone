import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from "react-router-dom"; // 🚕🚗 브라우저 라우터 가져오기
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

// 배포 환경에서 로그 막기
if (process.env.REACT_APP_NODE_ENV === 'production') {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
}

root.render(
  <React.StrictMode>
    {/* <BrowserRouter future={{ v7_startTransition: true }} basename={process.env.REACT_APP_PUBLIC_URL}> * 🚕🚗 basename='react-netflix-clone' << gh-pages를 위한 설정 */}
    <BrowserRouter future={{ v7_startTransition: true }}> {/** 🚕🚗 basename='react-netflix-clone' << gh-pages를 위한 설정 */}
    {/* <HashRouter> */}
      <QueryClientProvider client={queryClient}> {/** react query 사용 */}
        <App />
        <ReactQueryDevtools /> {/* devtools 사용 시 추가*/}
      </QueryClientProvider>
    {/* </HashRouter> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/** (위 부터 우선 적용)
 * npm start
    .env.development.local
    .env.development
    .env.local
    .env
  npm run build
    .env.production.local
    .env.production
    .env.local
    .env
  npm test
    .env.test.local
    .env.test
    .env
 * 
 * 
 */