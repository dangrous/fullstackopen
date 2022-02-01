import React, {useState} from 'react'

const Blog = ({blog, updateBlog, removeBlog, username}) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const addLike = () => {
    updateBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
    removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetails = () => (
    <>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
      <div>{blog.user.name}</div>
      {username === blog.user.username ? removeButton() : ''}
    </>
  )

  const removeButton = () => (
    <button onClick={deleteBlog}>remove</button>
  )
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button onClick={toggleVisibility}>{visibility ? 'hide' : 'view'}</button>
      {visibility ? blogDetails() : ''}
    </div>  
  )
}

export default Blog