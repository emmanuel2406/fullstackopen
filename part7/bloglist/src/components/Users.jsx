import { useSelector } from "react-redux"
import { useMatch, useLocation } from "react-router-dom"
import {
  StyledTable,
  CrimsonLink,
  SectionTitle,
  CrimsonContainer,
  TableCell,
  CenteredCell,
} from "./styles"

const User = () => {
  const blogs = useSelector((state) => state.blogs)
  const location = useLocation()
  const match = useMatch("/users/:id")

  const userBlogs = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : []

  // Get user name from location state, or derive from blogs as fallback
  const userName =
    location.state?.userName ||
    (userBlogs.length > 0 ? userBlogs[0].user.name : "Unknown User")

  return (
    <CrimsonContainer>
      <SectionTitle>{userName}</SectionTitle>
      <h3 style={{ color: "#666", marginBottom: "15px" }}>
        <b>Added Blogs</b>
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {userBlogs.map((blog) => (
          <li
            key={blog.id}
            style={{
              padding: "10px",
              marginBottom: "8px",
              background: "rgba(165, 28, 48, 0.05)",
              borderRadius: "5px",
              borderLeft: "3px solid #a51c30",
            }}
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </CrimsonContainer>
  )
}

const Users = () => {
  const blogs = useSelector((state) => state.blogs)

  const userBlogCounts = blogs.reduce((acc, blog) => {
    const userName = blog.user.username
    if (!acc[userName]) {
      acc[userName] = { name: userName, id: blog.user.id, count: 0 }
    }
    acc[userName].count++
    return acc
  }, {})

  const users = Object.values(userBlogCounts)
  return (
    <div>
      <SectionTitle>Users</SectionTitle>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <TableCell>
                <CrimsonLink
                  to={`/users/${user.id}`}
                  state={{ userName: user.name }}
                >
                  {user.name}
                </CrimsonLink>
              </TableCell>
              <CenteredCell>{user.count}</CenteredCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  )
}

export { Users, User }
