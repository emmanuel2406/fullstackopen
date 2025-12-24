import { useState } from "react"
import { useDispatch } from "react-redux"
import { setBlogs } from "../reducers/blogsReducer"
import { useSelector } from "react-redux"
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer"

const Blog = ({ blog, handleLike, removeBlog, canRemove }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteStyle = {
    backgroundColor: "lightblue",
  }

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const handleRemove = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(id)
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
      dispatch(
        setNotification(`Blog ${blog.title} by ${blog.author} removed`, "info"),
      )
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
  }

  if (!expanded) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button name="view" onClick={() => toggleExpanded()}>
          view
        </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => toggleExpanded()}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button name="like" onClick={() => handleLike(blog.id)}>
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
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

export default Blog
