import React, { useState, useEffect } from 'react'
import { initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import userService from '../services/users'
import Comments from './Comments'

const Blog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(null)
  const match = useMatch('/blogs/:id')
  const id = match ? match.params.id : null

  const user = useSelector((state) => state.user)

  const getBlog = async (id) => {
    const blog = await blogService.getOne(id)
    const user = await userService.getOne(blog.user)
    blog.user = user
    setBlog(blog)
  }

  useEffect(() => {
    getBlog(id)
  }, [])

  const addLike = () => {
    try {
      dispatch(updateBlog(blog.id))
      setBlog({ ...blog, likes: blog.likes + 1 })
    } catch (exception) {
      dispatch(setNotification(`Could not add the like to "${blog.title}"`, 5))
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('Removed blog post', 5))
        navigate('/')
      } catch (exception) {
        dispatch(setNotification('Could not remove blog post', 5))
      }
    }
  }

  const removeButton = () => <button onClick={removeBlog}>remove</button>

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <button className='like-button' onClick={addLike}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username ? removeButton() : null}
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
