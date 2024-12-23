import React, { createContext, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";

// 📍 1. context 생성
export const LoadingContext = createContext(false)

// 📍 2. Provider 컴포넌트 > state와 state의 상태를 제어하는 함수 선언
function LoadingProvider ({ children }) {
    // const isFetching = useIsFetching(); // React Query의 fetching 상태 감지
    const [isLoading, setIsLoading] = useState(false);
    const activeLoading = () => setIsLoading(true)
    const deactiveLoading = () => setIsLoading(false)

    return (
        <LoadingContext.Provider value={{ isLoading, activeLoading, deactiveLoading }}>
           {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider