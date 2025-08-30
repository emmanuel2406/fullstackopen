import { useState } from 'react'

const Blog = ({ blog, handleLike, removeBlog, canRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    backgroundColor: 'lightblue',
  }

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const handleRemove = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(id)
    }
  }

  if (!expanded) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{' '}
        <button onClick={() => toggleExpanded()}>view</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => toggleExpanded()}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {canRemove && (
        <div>
          <button style={deleteStyle} onClick={() => handleRemove(blog.id)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog