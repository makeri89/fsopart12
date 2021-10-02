const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    const likes = blogs.map(blog => blog.likes)
    const reducer = (acc, cur) => acc + cur
    const summa = likes.reduce(reducer)
    return summa
}

const favoriteBlog = (blogs) => {
    const likeAmount = blogs.map(blog => blog.likes)
    // console.log(likeAmount)
    const maksimi = Math.max(...likeAmount)
    // console.log(maksimi)
    const indeksi = likeAmount.indexOf(maksimi)
    // console.log(indeksi)
    return blogs[indeksi]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}