import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
      state.sort((a, b) => b.likes - a.likes)
    },
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      const id = action.payload
      const blogToUpdate = state.find((n) => n.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      }
      return state
        .map((blog) => (blog.id !== id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state
        .filter((blog) => blog.id !== id)
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { appendBlog, setBlogs, likeBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = (id) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.getOne(id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }
    await blogService.update(updatedBlog, id)
    dispatch(likeBlog(id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
