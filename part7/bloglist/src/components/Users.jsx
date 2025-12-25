import { useSelector } from "react-redux"
import { useMatch, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

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
    <div>
      <h2>{userName}</h2>
      <h3>
        <b>added blogs</b>
      </h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
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
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <b>Blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${user.id}`} state={{ userName: user.name }}>
                  {user.name}
                </Link>
              </td>
              <td>{user.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Users, User }
