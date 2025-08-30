import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleCreate = async (event) => {
    event.preventDefault()

    createBlog({title: newTitle, author: newAuthor, url: newUrl})

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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