import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const handleCreate = async (event) => {
    event.preventDefault()

    createBlog({ title: newTitle, author: newAuthor, url: newUrl })

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
            placeholder="Enter title here"
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
            placeholder="Enter author here"
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
            placeholder="Enter url here"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit" name="save">save</button>
    </form>
  )
}

export default BlogForm