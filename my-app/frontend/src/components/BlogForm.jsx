import React, { useState } from 'react'
import NotifySuccess from './NotifySuccess'

const BlogForm = ({ createBlog }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const blogformStyle = {
        backgroundColor: 'lightgray',
        border: 'solid lightgreen 3px',
        textAlign: 'center',
    }

    const handleBlogTitleChange = (e) => {
        setNewBlogTitle(e.target.value)
    }
    
    const handleBlogAuthorChange = (e) => {
        setNewBlogAuthor(e.target.value)
    }
    
    const handleBlogUrlChange = (e) => {
        setNewBlogUrl(e.target.value)
    }

    const addBlog = (e) => {
        e.preventDefault()
        createBlog({
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
      }

    return (
        <div style={blogformStyle}>
            <h2>Add new blog</h2>
            <form onSubmit={addBlog}>
                title: <input value={newBlogTitle} onChange={handleBlogTitleChange} id='title' required/><br/>
                author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange} id='author' required/><br/>
                url: <input value={newBlogUrl} onChange={handleBlogUrlChange} id='url' required/><br/>
                <button id='submit-blog-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default BlogForm