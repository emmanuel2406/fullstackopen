const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.payload
    case "ADD_BLOG":
      return state.concat(action.payload)
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.payload.id
          ? {
              ...action.payload,
              user: action.payload.user
                ? { ...action.payload.user }
                : action.payload.user,
            }
          : blog,
      )
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.payload)
    default:
      return state
  }
}

export default blogsReducer

export const setBlogs = (blogs) => {
  return {
    type: "SET_BLOGS",
    payload: blogs,
  }
}

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    payload: blog,
  }
}

export const updateBlog = (blog) => {
  return {
    type: "UPDATE_BLOG",
    payload: blog,
  }
}

export const removeBlog = (id) => {
  return {
    type: "REMOVE_BLOG",
    payload: id,
  }
}
