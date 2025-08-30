import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ blogs, setBlogs, setInfoMessage }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleCreate = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setInfoMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }
  return (
      <form onSubmit={handleCreate}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
        </div>
        <div>
        <label>author:
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
        </div>
        <div>
        <label>url:
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
        </div>
        <button type="submit">create</button>
    </form>
  )
}

export default BlogForm