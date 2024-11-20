import React, { createContext, useState } from "react";

// 📍 1. context 생성
export const LoadingContext = createContext(false)

// 📍 2. Provider 컴포넌트 > state와 state의 상태를 제어하는 함수 선언
function LoadingProvider ({ children }) {
    const [isLoading, setIsLoading] = useState(false)

    const activeLoading = () => setIsLoading(true)
    const deactiveLoading = () => setIsLoading(false)

    return (
        <LoadingContext.Provider value={{ isLoading, activeLoading, deactiveLoading }}>
           {children}
        </LoadingContext.Provider>
    )
}

export default LoadingProvider

// 💡 참고) https://velog.io/@velopert/react-context-tutorial