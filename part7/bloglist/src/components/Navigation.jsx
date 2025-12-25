import Logout from "./Logout"
import { Link } from "react-router-dom"

const Navigation = ({ username, handleLogout }) => {
  return (
    <div>
      <Link to="/">blogs</Link> <Link to="/users">users</Link>
      <p>
        {username} logged in
        <Logout handleLogout={handleLogout} />
      </p>
    </div>
  )
}

export default Navigation
