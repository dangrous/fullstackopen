import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const addLike = () => {
    try {
      dispatch(updateBlog(blog.id))
    } catch (exception) {
      dispatch(setNotification(`Could not add the like to "${blog.title}"`, 5))
    }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification('Removed blog post', 5))
      } catch (exception) {
        dispatch(setNotification('Could not remove blog post', 5))
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogDetails = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}{' '}
        <button className='like-button' onClick={addLike}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {username === blog.user.username ? removeButton() : ''}
    </>
  )

  const removeButton = () => <button onClick={removeBlog}>remove</button>

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}{' '}
      <button className='view-button' onClick={toggleVisibility}>
        {visibility ? 'hide' : 'view'}
      </button>
      {visibility ? blogDetails() : ''}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
