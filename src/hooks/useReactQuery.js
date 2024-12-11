import { useQuery } from "@tanstack/react-query";
import { fetchCreditDetails, fetchContents, fetchSimilarContents, fetchRecommendContents, fetchVideo, fetchContentsByGenre } from "api/movieApi";

export const useContentsQueryKey = {
    movie: {
        type: 'movie',
        nowPlaying: 'now_playing',
        topRated: 'top_rated',
        popular: 'popular',
        upcoming: 'upcoming',
    },
    tv: {
        type: 'tv',
        onTheAir: 'on_the_air',
        airingToday: 'airing_today',
        topRated: 'top_rated',
        popular: 'popular',
    }
}
export const useConetentsQuery = (props) => {
    const { key, type, content } = props
    return useQuery({
        queryKey: [key, type, content],
        queryFn: fetchContents,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useConetentsByGenreQuery = (props) => {
    const { type, genreId } = props
    return useQuery({
        queryKey: [type +'_' + genreId, type, genreId],
        queryFn: fetchContentsByGenre,
        select: data => data.filter(el => el.backdrop_path !== null && el.poster !== null)
    })
}
export const useCrditDetailsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + '_cast', type],
        queryFn: fetchCreditDetails,
    })
}
export const useSimilarContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + "_similar", type, id],
        queryFn: fetchSimilarContents
    })
}
export const useRecommendContentsQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + "_recommend", type, id],
        queryFn: fetchRecommendContents
    })
}
export const useVideoQuery = (props) => {
    const { type, id } = props
    return useQuery({
        queryKey: [id + "_video", type, id],
        queryFn: fetchVideo,
        select: data => data.find(el => el.type === 'Trailer' || el.type === 'Teaser').key
    })
}