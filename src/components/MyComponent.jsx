import React, { useCallback, useEffect, useMemo, useState } from "react";

// 컴포넌트가 리렌더링 되는 조건
// 1. state 값이 변경될 때
// 2. props가 변경될 때
function MyComponent () {
    const [state, setState] = useState(0)

    const onClick = () => {} // Hook을 사용하지 않고 선언된 함수 혹은 값은 해당 컴포넌트가 다시 실행될 때마다 새로 생성됨
    // => 메모리 주소값이 달라지므로 기존 함수와 다른 함수이므로 하위 컴포넌트에게 전달되는 props가 변경됨
    // 이 때 useCallback hook을 사용하면 props는 변경되지 않기 때문에 하위 컴포넌트의 리렌더링을 막을 수 있음
    // 리액트는 렌더링 과정에서 2가지 단계를 거친다.
    // 1. render phase : 가상 DOM을 만들고, 실제 DOM과 비교하여 업데이트가 필요한 부분을 찾는 단계
    //      => React.memo()를 통해 최적화
    // 2. commit phase : 실제 DOM 업데이트 단계
    //      => useCallback을 이용한 메모이제이션을 통해 최적화
    const memoizationCallback = useCallback(() => {
        onClick()
    }, [])

    // 상태 값을 메모이제이션하려면 useMemo()를 이용
    const value = 0
    const memoizationValue = useMemo(() => {
        return value
    }, [value])

    // 단, 무분별한 사용은 메모리를 불필요하게 사용하는 것이므로 꼭 필요한 경우에만 사용!

    useEffect(() => {
        setTimeout(() => {
            setState(1)
            console.log('update', );
        }, 1000)
    }, [])

    return (
        <div>
            {/* <MayRandering onClick={onClick} /> */}
            <ManyRandering onClick={memoizationCallback} />
        </div>
    )
}

// React.memo() => props가 변경되지 않으면 해당 컴포넌트는 리렌더링되지 않음
const ManyRandering = React.memo(({ onClick }) => {
    return (
        <>
            {Array.from({length: 100}, (_, i) => {
                if (i === 99) console.log('rendering last item:', i);
                return (
                    <div>
                        Hello, React!
                    </div>
                )
            })}
        </>
    )
})

export default MyComponent