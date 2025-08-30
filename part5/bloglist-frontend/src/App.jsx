import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type='error' />
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      </div>
    )
  }
  return (
    <div>
      <Notification message={infoMessage} type='info' />
      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged in
          <Logout setUser={setUser}/>
        </p>
      </div>
      <h2>create new</h2>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setInfoMessage={setInfoMessage} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App