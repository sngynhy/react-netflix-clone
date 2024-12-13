import LoadingOverlay from "components/ui/LoadingOverlay";
import Slider from "components/ui/Slider";
import { useConetentsByGenreQuery } from "hooks/useReactQuery";
import React, { useEffect } from "react";
import { useMediaStore } from "stores/CommonStore";

export const GenreConetns = (props) => {
    const {mType, genreId, sendDataToParent} = props
    const {genreName} = useMediaStore()

    const {data: data, isLoading: isLoading, error: error} = useConetentsByGenreQuery({ type: mType, genreId: genreId })
    
    useEffect(() => {
        if (!isLoading) {
            sendDataToParent(data)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (isLoading) return <LoadingOverlay />;
    if (error) return <p>Error occurred!</p>;

    return (
        <>
        {data &&
            <div style={{paddingTop: '650px'}}>
                <div>
                    <Slider mType={mType} name={genreName + ' 콘텐츠'} data={data} />
                </div>
            </div>}
        </>
    )
}