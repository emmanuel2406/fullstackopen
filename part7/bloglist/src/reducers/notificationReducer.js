const initialState = {
  message: null,
  type: null,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      }
    case "RESET_NOTIFICATION":
      return { ...state, message: null, type: null }
    default:
      return state
  }
}

export default notificationReducer

export const setNotification = (message, type) => {
  return {
    type: "SET_NOTIFICATION",
    payload: { message, type },
  }
}

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" }
}
