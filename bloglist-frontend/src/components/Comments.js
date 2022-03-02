import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'

const Comments = ({ blog }) => {
  const addComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    await blogService.comment(updatedBlog, blog.id)
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input type='text' name='comment'></input>
        <button type='submit'>add comment</button>
      </form>
      {blog.comments.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </div>
  )
}

export default Comments
