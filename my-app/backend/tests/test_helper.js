const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{"title":"Ruokablogi","author":"Kokki Kolmonen","url":"http://wikipedia.org","likes":1000,"id":"5f71ffca4f788d8c35697f38"},{"title":"Muotiblogi","author":"Pelle Hermanni","url":"http://helsinki.fi","likes":10,"id":"5f72256abf86852167bc7e5d"},{"title":"Testiblogi","author":"Pelle Hermanni","url":"http://helsinki.fi","likes":10,"id":"5f7225c6f49bf423913c8556"}]
// const userForBlogtests = {"username":"blogitestaaja","name":"testaaja200","password":"salaisuus"}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}