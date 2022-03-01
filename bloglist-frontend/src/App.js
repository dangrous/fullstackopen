import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(login(user))
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
    dispatch(logout())

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
      <BlogForm />
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
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
    </div>
  )
}

export default App
