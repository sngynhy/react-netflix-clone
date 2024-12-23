import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useMediaStore } from 'stores/mediaStore';
import { MainContent } from 'components/contents/media/MainContent';
import { GenreContents } from 'components/contents/media/slidersection/GenreContents';
import { MediaContents } from 'components/contents/media/slidersection/MediaContents';
import { getContentImg } from 'utils/CommonFunction';

const mediaTypes = {
    movie: '영화',
    tv: '시리즈'
}

function Media () {
    let { mType, genreId } = useParams()
    const { setMediaType, openDetailModal, setOpenContentId } = useMediaStore()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMediaType(mType), [mType])
    
    const [coverData, setCoverData] = useState(null)
    const recieveCoverData = useCallback((data) => {
        // console.log('recieveCoverData', data)
        const coverData = {
            id: data.id,
            title: data.title || data.name,
            img: getContentImg(data.backdrop_path),
            overview: data.overview.length > 130 ? data.overview.slice(0, 130) + '...' : data.overview
        }
        setOpenContentId(data.id)
        setCoverData(coverData)
    }, [])

    return (
        <div style={{position: openDetailModal ? 'fixed' : '', height: '100%', width: '100%'}}>
            <div style={{opacity: openDetailModal ? 0.7 : 1}}>
                {/** 중앙 메인 콘텐츠 */}
                {coverData && <MainContent mType={mType} name={mediaTypes[mType]} genreId={genreId} coverData={coverData} />}

                {/** 하단 슬라이더 */}
                {genreId ? <GenreContents mType={mType} genreId={genreId} sendCoverDat={recieveCoverData} /> : <MediaContents mType={mType} sendCoverData={recieveCoverData} />}
            </div>
        </div>
    )
}

export default Media