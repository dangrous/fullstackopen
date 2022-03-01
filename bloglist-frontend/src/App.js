import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogList = async () => {
      const newList = await blogService.getAll()
      setBlogs(newList)
    }
    getBlogList()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      dispatch(
        setNotification(
          `Added a new blog, "${blogObject.title}" by ${blogObject.author}`,
          5
        )
      )

      const newList = await blogService.getAll()
      setBlogs(newList)
    } catch (exception) {
      dispatch(setNotification('Could not add the blog post', 5))
    }
  }

  const updateBlog = async (blogObject, blogId) => {
    try {
      await blogService.update(blogObject, blogId)
      const newList = await blogService.getAll()
      setBlogs(newList)
    } catch (exception) {
      dispatch(
        setNotification(`Could not add the like to "${blogObject.title}"`, 5)
      )
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const newList = await blogService.getAll()
      dispatch(setNotification('Removed blog post', 5))
      setBlogs(newList)
    } catch (exception) {
      dispatch(setNotification('Could not remove blog post', 5))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Logged in', 3))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    dispatch(setNotification('Logged out', 5))
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          username={user.username}
        />
      ))}
    </div>
  )
}

export default App
