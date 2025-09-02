import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setInfoMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <h2>create new</h2>
      <BlogForm createBlog={handleCreate} />
    </Togglable>
  )

  const handleLogin = async (userObject) => {
    const user = await loginService.login(userObject)
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
  }
  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Togglable buttonLabel='log in'>
        <LoginForm loginUser={handleLogin} />
      </Togglable>
    </>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
  }

  const handleRemove = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const canRemove = (blog) => {
    if (!user) {
      return false
    }
    return blog.user.username === user.username
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <Notification message={infoMessage} type='info' />
      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged in
          <Logout handleLogout={handleLogout}/>
        </p>
      </div>
      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} removeBlog={handleRemove} canRemove={canRemove(blog)} />
        )
      }
    </div>
  )
}

export default App