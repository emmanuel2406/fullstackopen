import { useEffect } from "react"
import "./index.css"
import blogService from "./services/blogs"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import {
  setNotification,
  resetNotification,
} from "./reducers/notificationReducer"
import {
  addBlog,
  setBlogs,
  updateBlog,
  removeBlog,
} from "./reducers/blogsReducer"
import { setUsername, clearUser } from "./reducers/userReducer"
import { User, Users } from "./components/Users"
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./components/Home"
import { BlogInfo } from "./components/Blog"
import Navigation from "./components/Navigation"

// Helper function to normalize blog objects and prevent Redux mutations
const normalizeBlog = (blog) => ({
  ...blog,
  user: blog.user ? { ...blog.user } : blog.user,
  comments: Array.isArray(blog.comments) ? [...blog.comments] : [],
})

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const showNotification = (message, type = "info") => {
    dispatch(setNotification(message, type))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const normalizedBlogs = blogs.map(normalizeBlog)
      dispatch(setBlogs(normalizedBlogs))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUsername(user.username))
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    const normalizedBlog = normalizeBlog(returnedBlog)
    dispatch(addBlog(normalizedBlog))
    showNotification(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      "info",
    )
  }

  const handleLogin = async (userObject) => {
    const user = await loginService.login(userObject)
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
    dispatch(setUsername(user.username))
    blogService.setToken(user.token)
  }
  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Togglable buttonLabel="log in">
        <LoginForm loginUser={handleLogin} />
      </Togglable>
    </>
  )

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    blogService.setToken(null)
    dispatch(clearUser())
  }

  const handleLike = async (id) => {
    // Use atomic like endpoint - no need to read current state
    const updatedBlog = await blogService.like(id)
    const normalizedBlog = normalizeBlog(updatedBlog)
    dispatch(updateBlog(normalizedBlog))
  }

  const handleRemove = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (!blog) {
      showNotification("Blog not found", "error")
      return
    }
    // Store blog info before removal for notification
    const blogTitle = blog.title
    const blogAuthor = blog.author
    await blogService.remove(id)
    dispatch(removeBlog(id))
    showNotification(`Blog ${blogTitle} by ${blogAuthor} removed`, "info")
    navigate("/")
  }

  const handleAddComment = async (id, comment) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      const normalizedBlog = normalizeBlog(updatedBlog)
      dispatch(updateBlog(normalizedBlog))
      showNotification("Comment added", "info")
    } catch (error) {
      console.error("Error adding comment:", error)
      if (error.response?.status === 404) {
        showNotification("Blog not found", "error")
      } else {
        showNotification("Failed to add comment", "error")
      }
    }
  }

  const canRemove = (blog) => {
    if (!user || !user.username) {
      return false
    }
    return blog.user.username === user.username
  }

  if (!user || !user.username) {
    return loginForm()
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <Navigation username={user.username} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleCreate={handleCreate}
              handleLike={handleLike}
              handleRemove={handleRemove}
              canRemove={canRemove}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogInfo
              handleLike={handleLike}
              canRemove={canRemove}
              handleRemove={handleRemove}
              handleAddComment={handleAddComment}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
