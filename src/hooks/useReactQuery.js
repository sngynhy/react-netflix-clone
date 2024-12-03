import { useQuery } from "@tanstack/react-query";
import { fetchNowplayingMovie, fetchPopularMovie, fetchTopratedMovie, fetchUpcommingMovie } from 'api/movieApi';

export const useMovieQueryKey_nowplaying = 'nowPlayingMovie'
export const useMovieQueryKey_popular = 'popularMovie'
export const useMovieQueryKey_topRated = 'topRatedMovie'
export const useMovieQueryKey_upcomming = 'upcommingMovie'

const map = new Map()
map.set(useMovieQueryKey_nowplaying, fetchNowplayingMovie)
map.set(useMovieQueryKey_popular, fetchPopularMovie)
map.set(useMovieQueryKey_topRated, fetchTopratedMovie)
map.set(useMovieQueryKey_upcomming, fetchUpcommingMovie)

// react query hook
function useMovieQuery (props) {
    const { key } = props
    return useQuery({
        queryKey: [key],
        queryFn: map.get(key),
        select: data => data.filter(el => el.backdrop_path !== null)
    })
}

export default useMovieQuery