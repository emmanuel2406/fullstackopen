import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import Comments from "./Comments"
import CommentForm from "./CommentForm"
import {
  DeleteButton,
  LikeButton,
  CrimsonLink,
  SectionTitle,
  CrimsonContainer,
  TableCell,
  CenteredCell,
  HARVARD_CRIMSON,
} from "./styles"

const BlogInfo = ({
  handleLike,
  canRemove,
  handleRemove,
  handleAddComment,
}) => {
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <CrimsonContainer>
      <SectionTitle>
        {blog.title} by {blog.author}
      </SectionTitle>
      <p>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: HARVARD_CRIMSON, fontWeight: 600 }}
        >
          {blog.url}
        </a>
      </p>
      <p style={{ fontSize: "1.1em", marginBottom: "10px" }}>
        <strong>{blog.likes}</strong> likes{" "}
        <LikeButton name="like" onClick={() => handleLike(blog.id)}>
          ❤️ like
        </LikeButton>
      </p>
      <p style={{ color: "#666", marginBottom: "15px" }}>
        added by <strong>{blog.user.name}</strong>
      </p>
      {canRemove && (
        <div style={{ marginBottom: "20px" }}>
          <DeleteButton name="remove" onClick={() => handleRemove(blog.id)}>
            🗑️ remove
          </DeleteButton>
        </div>
      )}
      <Comments comments={blog.comments} />
      <CommentForm blogId={blog.id} addComment={handleAddComment} />
    </CrimsonContainer>
  )
}

const Blog = ({ blog }) => {
  return (
    <tr>
      <TableCell>
        <CrimsonLink to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </CrimsonLink>
      </TableCell>
      <CenteredCell>❤️ {blog.likes}</CenteredCell>
    </tr>
  )
}

export { Blog, BlogInfo }
