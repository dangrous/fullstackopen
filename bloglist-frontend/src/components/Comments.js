import React from 'react'
import blogService from '../services/blogs'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const addComment = async (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    e.target.comment.value = ''
    await blogService.comment(updatedBlog, blog.id)
    blog.comments.concat(comment)
  }

  return (
    <div className='mt-3'>
      <h3>comments</h3>
      <ListGroup>
        {blog.comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={addComment}>
        <Form.Control type='text' name='comment' />
        <Button type='submit' className='mb-3 mt-1'>
          add comment
        </Button>
      </Form>
    </div>
  )
}

export default Comments
