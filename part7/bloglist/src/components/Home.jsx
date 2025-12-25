import { useRef } from "react"
import { useSelector } from "react-redux"
import { Blog } from "./Blog"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import { StyledTable } from "./styles"

const Home = ({ handleCreate, handleLike, handleRemove, canRemove }) => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  const handleCreateWithToggle = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await handleCreate(blogObject)
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={handleCreateWithToggle} />
      </Togglable>

      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Title & Author</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </StyledTable>
    </>
  )
}

export default Home
