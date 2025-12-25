import { useRef } from "react"
import { useSelector } from "react-redux"
import { Blog } from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const Home = ({ handleCreate, handleLike, handleRemove, canRemove }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const handleCreateWithToggle = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await handleCreate(blogObject)
  }

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={handleCreateWithToggle} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default Home
