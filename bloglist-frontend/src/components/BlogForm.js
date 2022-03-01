import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type='text' id='title' name='Title' />
        </div>
        <div>
          author:
          <input type='text' id='author' name='Author' />
        </div>
        <div>
          url:
          <input type='text' id='url' name='URL' />
        </div>
        <button id='blog-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
}

export default connect(null, mapDispatchToProps)(BlogForm)
