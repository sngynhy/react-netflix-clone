import LoadingOverlay from "components/ui/LoadingOverlay";
import Slider from "components/ui/Slider";
import { useConetentsQuery, useContentsQueryKey } from "hooks/useReactQuery";
import React, { useEffect } from "react";

export const MovieContents = (props) => {
    // console.log('MovieContents', props);
    const {mType, mediaTypes, sendDataToParent} = props
    const isMovie = mType === 'movie'
    // console.log('SliderSection', id, type);
    const {movie, tv} = useContentsQueryKey
    // const {isLoading, setIsLoading} = useGlobalStore()
    // console.log('isLoading', isLoading);

    const {data: nowPlaying, isLoading: nowPlayingLoading, error: nowPlayingError} = useConetentsQuery({
        key: isMovie ? movie.nowPlaying : tv.onTheAir,
        type: mType,
        content: isMovie ? movie.nowPlaying : tv.onTheAir
    })
    const {data: popluar, isLoading: popluarLoading, error: popluarError} = useConetentsQuery({
        key: isMovie ? movie.popular : tv.popular,
        type: mType,
        content: isMovie ? movie.popular : tv.popular
    })
    const {data: topRated, isLoading: topRatedLoading, error: topRatedError} = useConetentsQuery({
        key: isMovie? movie.topRated : tv.topRated,
        type: mType,
        content: isMovie ? movie.topRated : tv.topRated
    })
    const {data: upcoming, isLoading: upcomingLoading, error: upcomingError} = useConetentsQuery({
        key: isMovie ? movie.upcoming : tv.airingToday,
        type: mType,
        content: isMovie ? movie.upcoming : tv.airingToday
    })
    useEffect(() => {
        if (!topRatedLoading) {
            sendDataToParent(topRated)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topRated])

    // setIsLoading(nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading)

    if (nowPlayingLoading || upcomingLoading || popluarLoading || topRatedLoading) return <LoadingOverlay />;
    if (nowPlayingError || upcomingError || popluarError || topRatedError) return <p>Error occurred!</p>;

    return (
        <div style={{paddingTop: '650px'}}>
            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[0]} data={nowPlaying} />
            </div>

            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[2]} data={topRated} />
            </div>

            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[1]} data={popluar} />
            </div>

            <div>
                <Slider mType={mType} name={mediaTypes[mType].title[3]} data={upcoming} />
            </div>
        </div>
    )
}