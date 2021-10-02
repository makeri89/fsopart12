import React, { useState } from 'react'

const Blog = ({ blog, doALike, doADelete, user }) => {
  
  const [showFullInfo, setShowFullInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid 3px black',
    marginBottom: 5,
    backgroundColor: 'lightgray',
    textAlign: 'center'
  }

  let whatToShow = 'none'

  if (user.username === blog.user.username) {
    whatToShow = ''
  }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
  
  const showDeleteStyle = {
    display: whatToShow
  }

  if (showFullInfo) {
    return (
      <div style={blogStyle} className='blog'>
        <p>{blog.title}</p>
        <p>by {blog.author}</p>
        <p>This blog can be found at <a href={blog.url}>{blog.url}</a></p>
        <p>This blog has {blog.likes} likes<button value={blog.id} onClick={doALike} id='likeButton'>like</button></p>
        <button onClick={() => setShowFullInfo(false)}>hide</button>
        {loggedUser.username === user.username &&
        <button onClick={doADelete} value={blog.id} style={showDeleteStyle} id='deleteButton'>delete</button>
        }
      </div>
    )
  }

  return (
    <div style={blogStyle} className='initialBlog'>
      <div>
        {blog.title} {blog.author} <br/>
        <button onClick={() => setShowFullInfo(true)} id='viewButton'>view</button>
      </div>
    </div>
  )
}

export default Blog
