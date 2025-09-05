import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: 'Initial notification'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return {
        content: action.payload
      }
    },
    resetNotification: () => {
      return {
        content: ''
      }
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (content, timeout) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, timeout * 1000)
  }
}
export default notificationSlice.reducer