import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useMediaStore } from 'stores/mediaStore';
import MainContent from 'components/contents/media/MainContent';
import { GenreContents } from 'components/contents/media/slidersection/GenreContents';
import { MediaContents } from 'components/contents/media/slidersection/MediaContents';
import { MovieContents } from 'components/contents/media/slidersection/MovieConetns';

const mediaTypes = {
    movie: '영화',
    tv: '시리즈'
}

function Media () {
    let { mType, genreId } = useParams()
    // console.log('Media', genreId);
    const { setMediaType, openDetailModal } = useMediaStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMediaType(mType), [mType])
    return (
        <div style={{position: openDetailModal ? 'fixed' : ''}}>
            {/* {openDetailModal && genreBoxRef && <div ref={detailModalRef}><DetailModal id={coverContents.id} type={type} /></div>} */}
            
            <div style={{opacity: openDetailModal ? 0.7 : 1}}>
                {/** 중앙 메인 콘텐츠 */}
                <MainContent mType={mType} name={mediaTypes[mType]} genreId={genreId} />

                {/** 하단 슬라이더 */}
                {genreId ? <GenreContents mType={mType} genreId={genreId} /> : <MediaContents mType={mType} />}
                {/* {genreId ? <GenreContents mType={mType} genreId={genreId} /> : <MovieContents mType={mType} />} */}
            </div>
        </div>
    )
}

export default Media