import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

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
      <div className='container'>
        <h2 className='mt-3'>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
      <Navbar
        CollapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        className='p-1'
      >
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link to='/'>All Blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link to='/users'>Users</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <em className='me-1' style={{ color: '#fff' }}>
                {user.name} <span style={{ color: '#ccc' }}>logged in</span>
              </em>
              <Button variant='secondary' size='sm' onClick={handleLogout}>
                logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <h1 className='mt-3'>Look at these great blogs!</h1>
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
