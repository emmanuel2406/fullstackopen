const initialState = {
  username: null,
  password: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload }
    case "SET_PASSWORD":
      return { ...state, password: action.payload }
    case "CLEAR_USER":
      return initialState
    default:
      return state
  }
}

export default userReducer

export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    payload: username,
  }
}

export const setPassword = (password) => {
  return {
    type: "SET_PASSWORD",
    payload: password,
  }
}

export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  }
}
