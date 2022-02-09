const initialState = 'initial notification'

export const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { content },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.data.content
    }
    case 'CLEAR_NOTIFICATION': {
      return ''
    }
    default:
      return state
  }
}

export default notificationReducer
