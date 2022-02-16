import { createSlice } from '@reduxjs/toolkit'

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

export const { updateNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(updateNotification(message))
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
