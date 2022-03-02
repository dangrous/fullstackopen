import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      return action.payload
    },
    clearUser(state, action) {
      return null
    },
  },
})

export const { updateUser, clearUser } = userSlice.actions

export const login = (user) => {
  return async (dispatch) => {
    dispatch(updateUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(clearUser())
  }
}

export default userSlice.reducer
