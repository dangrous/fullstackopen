import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'

const RoutedApp = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())

    dispatch(setNotification('Logged out', 5))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div style={{ backgroundColor: '#ddd', padding: 5 }}>
        <Link style={padding} to='/'>
          blogs
        </Link>
        <Link style={padding} to='/users/'>
          users
        </Link>
        <span style={padding}>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blogs</h2>
      <Notification />
      <div></div>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

const App = () => (
  <Router>
    <RoutedApp />
  </Router>
)

export default App
