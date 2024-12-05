export const getGenresById = (data, genres) => {
    // 장르의 id값으로 name 추출
    // console.log('getGenresById', data, genres)
    return data.reduce((acc, curr) => {
        const find = genres.find(g => g.id === curr)
        if (find) acc.push(find.name)
        return acc
    }, [])
}

export const getContentImg = (path) => {
    return `https://image.tmdb.org/t/p/original${path}`
}
export const getContentVedio = (key) => {
    return `https://youtube.com/embed/${key}?autoplay=0&mute=1&controls=0&fs=0&modestbranding=0&rel=0&loop=1`
}