import React, { useEffect, useMemo } from "react";
import { useConetentsQueries } from "hooks/useReactQuery";
import { SliderContainer } from "components/ui/SliderContainer";
import { useMediaStore } from "stores/mediaStore";

export const MediaContents = (props) => {
        const { mType } = props
        const {setCoverContent} = useMediaStore() 

        const queries = useConetentsQueries(mType)
        const isLoading = queries.some((query) => query.isLoading)
        const coverData = useMemo(() => {
            return queries?.map(query => query.data)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queries])
        // console.log('isLoading', isLoading);
        useEffect(() => console.log('러ㅑㅣ넏랴ㅣ널ㄷ', queries), [queries])

        useEffect(() => {
            if (!isLoading) {
                const topRatedData = contentsData.find((el) => el.key === "topRated")?.data
                // console.log('topRatedData', topRatedData);
                if (topRatedData.length > 0) {
                    // setCoverContent(topRatedData.slice(0, 5)); // 필요한 데이터만 store에 저장
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLoading, coverData])
        
        if (isLoading) return
        if (queries.some((query) => query.isError)) return <div>Error occurred!</div>
        
        const contentsData = queries?.map(query => query.data)
        // console.log('contentsData', contentsData);
        return (
            <div style={{paddingTop: '650px'}}>
                <div>
                    {contentsData && contentsData.map((el, i) => <SliderContainer key={i} mType={mType} headerTitle={el.title || el.name} data={el.data} />) }
                </div>
            </div>
        )
}
