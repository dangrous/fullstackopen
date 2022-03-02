import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import blogService from '../services/blogs'
import { useMatch } from 'react-router-dom'

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

export default User
