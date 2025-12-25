const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      // Ensure we create new references for nested structures to avoid mutations
      return action.payload.map((blog) => ({
        ...blog,
        user: blog.user ? { ...blog.user } : blog.user,
        comments: Array.isArray(blog.comments) ? [...blog.comments] : [],
      }))
    case "ADD_BLOG":
      // Ensure we create new references for nested structures to avoid mutations
      const newBlog = {
        ...action.payload,
        user: action.payload.user
          ? { ...action.payload.user }
          : action.payload.user,
        comments: Array.isArray(action.payload.comments)
          ? [...action.payload.comments]
          : [],
      }
      return state.concat(newBlog)
    case "UPDATE_BLOG":
      return state.map((blog) => {
        if (blog.id !== action.payload.id) {
          return blog
        }
        // Ensure we create new references for nested structures to avoid mutations
        return {
          ...action.payload,
          user: action.payload.user
            ? { ...action.payload.user }
            : action.payload.user,
          comments: Array.isArray(action.payload.comments)
            ? [...action.payload.comments]
            : [],
        }
      })
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
