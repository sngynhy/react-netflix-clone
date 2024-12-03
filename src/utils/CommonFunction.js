export const getGenresById = (data, genres) => {
    // 장르의 id값으로 name 추출
    // console.log('getGenresById', data, genres)
    return data.reduce((acc, curr) => {
        const find = genres.find(g => g.id === curr)
        if (find) acc.push(find.name)
        return acc
    }, [])
}