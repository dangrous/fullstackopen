import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'
import userService from './services/users'

const RoutedApp = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
        <Route path='/' element={<Main />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<BlogPage />} />
      </Routes>
    </div>
  )
}

const User = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const match = useMatch('/users/:id')
  const id = match ? match.params.id : null

  const getUserData = async (id) => {
    const user = await userService.getOne(id)
    setUser(user)
    const allBlogs = await blogService.getAll()
    const ownedBlogs = allBlogs.filter((blog) => blog.user.id === user.id)
    setBlogs(ownedBlogs)
  }

  useEffect(() => {
    getUserData(id)
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user)

  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
    </div>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const users = await userService.getAll()
    setUsers(users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const BlogPage = () => {
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

  const removeButton = () => <button onClick={removeBlog}>remove</button>

  if (!blog) {
    return null
  }

  const comments = (blog) => {
    if (blog.comments.length < 1) {
      return null
    }
    return (
      <div>
        <h3>comments</h3>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    )
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
      {comments(blog)}
    </div>
  )
}

const App = () => (
  <Router>
    <RoutedApp />
  </Router>
)

export default App
