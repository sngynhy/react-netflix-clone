import React, { useEffect } from "react";
import { useConetentsQueries } from "hooks/useReactQuery";
import { SliderContainer } from "components/ui/slider/SliderContainer";

export const MediaContents = React.memo(({ mType, sendCoverData }) => {
    const queries = useConetentsQueries(mType)
    const isLoading = queries.some((query) => query.isLoading)
    const isError = queries.some((query) => query.isError)

    const contentsData = !isLoading ? queries?.map(query => query.data) : null
    useEffect(() => {
        if (!isLoading && contentsData) {
            const corverData = contentsData.find((el) => el.key === "topRated")?.data[Math.floor(Math.random() * 10)]
            sendCoverData(corverData)
        }
    }, [contentsData, isLoading, sendCoverData])
    
    if (isLoading || isError) return <></>
    // console.log('🍰🍰MediaContents🍰🍰', contentsData);
    
    return (
        <div style={{paddingTop: 'calc(100vh - 150px)'}}>
            <div>
                {contentsData && contentsData.map((el, i) => <SliderContainer key={i} mType={mType} headerTitle={el.title || el.name} data={el.data} />) }
            </div>
        </div>
    )
})