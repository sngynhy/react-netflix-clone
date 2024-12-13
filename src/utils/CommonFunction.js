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
export const getContentVedio = (logoData) => {
    const compareData = (a, b) => {
        if (a.iso_639_1 > b.iso_639_1) return -1
        if (a.iso_639_1 < b.iso_639_1) return 1
        return a.height - b.height
    }
    const path = logoData?.data?.sort(compareData)[0]?.file_path
    return getContentImg(path)
}