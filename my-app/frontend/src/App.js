import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  // Fetch all blogs from the db
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Logs the user in if username and password are correct
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password)
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Simple logout
  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  // Adding new blogs
  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    console.log(newBlog)
    setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel='add a new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  // Messages for errors and succesful operations
  const NotifyError = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const NotifySuccess = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  // Liking a blog
  const doALike = async (e) => {
    e.preventDefault()
    const id = e.target.value
    console.log(e.target.value)
    const blog = blogs.find(blog => blog.id === id)
    console.log(blog)
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      url: blog.url,
      likes: blog.likes + 1
    }

    const updated = await blogService.like(id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updated))
  }

  // Deleting a blog
  const doADelete = async (e) => {
    e.preventDefault()
    const id = e.target.value
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
    }

  const sortedBlogs = [...blogs]
    .sort((currBlog, nextBlog) => nextBlog.likes - currBlog.likes)

  // Contents to be rendered
  return (
    <div>
      <NotifyError message={errorMessage} />
      <NotifySuccess message={successMessage} />
      {user === null ?
        <div>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </div> :
        <div>
          <p>Logged in as {user.name}<button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          <h2>Blogs</h2>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} doALike={doALike} doADelete={doADelete} user={user} />
          )}
        </div>
      }
      
    </div>
  )
}

export default App