import { useSelector } from "react-redux"
import { useMatch, Link } from "react-router-dom"

const BlogInfo = ({ handleLike, canRemove, handleRemove }) => {
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  if (!blog) {
    return <div>Blog not found</div>
  }

  const deleteStyle = {
    backgroundColor: "lightblue",
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button name="like" onClick={() => handleLike(blog.id)}>
        like
      </button>
      <p>added by {blog.user.name}</p>
      {canRemove && (
        <div>
          <button
            style={deleteStyle}
            name="remove"
            onClick={() => handleRemove(blog.id)}
          >
            remove
          </button>
        </div>
      )}
    </div>
  )
}

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export { Blog, BlogInfo }
