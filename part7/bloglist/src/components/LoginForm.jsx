import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer"
import Notification from "./Notification"

const LoginForm = ({ loginUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await loginUser({ username, password })
      setUsername("")
      setPassword("")
    } catch {
      dispatch(setNotification("wrong username or password", "error"))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <Notification />
      <div>
        <label>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit" name="login">
        login
      </button>
    </form>
  )
}

export default LoginForm
