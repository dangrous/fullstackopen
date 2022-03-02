import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    try {
      props.createBlog(content)
      props.setNotification(
        `Added a new blog, "${content.title}" by ${content.author}`,
        5
      )
    } catch (exception) {
      props.setNotification('Could not add the blog post', 5)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type='text' id='title' name='Title' />
          <Form.Label>Author:</Form.Label>
          <Form.Control type='text' id='author' name='Author' />
          <Form.Label>URL:</Form.Label>
          <Form.Control type='text' id='url' name='URL' />
          <Button className='mt-2' id='blog-button' type='submit'>
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
}

export default connect(null, mapDispatchToProps)(BlogForm)
