import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

// export const setNotification = (content) => {
//   return {
//     type: 'SET_NOTIFICATION',
//     data: { content },
//   }
// }

// export const clearNotification = () => {
//   return {
//     type: 'CLEAR_NOTIFICATION',
//   }
// }

// const notificationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_NOTIFICATION': {
//       return action.data.content
//     }
//     case 'CLEAR_NOTIFICATION': {
//       return ''
//     }
//     default:
//       return state
//   }
// }

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
