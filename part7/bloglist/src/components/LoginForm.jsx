import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  setNotification,
  resetNotification,
} from "../reducers/notificationReducer"
import Notification from "./Notification"
import { Form } from "react-bootstrap"
import {
  LoginDialog,
  LoginBox,
  LoginTitle,
  StyledForm,
  CrimsonButton,
} from "./styles"

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
    <LoginDialog>
      <LoginBox>
        <LoginTitle>🔐 Log In</LoginTitle>
        <Notification />
        <StyledForm onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="Username"
              placeholder="Enter your username"
              onChange={({ target }) => setUsername(target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="Password"
              placeholder="Enter your password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <CrimsonButton type="submit" name="login" className="w-100">
            Login
          </CrimsonButton>
        </StyledForm>
      </LoginBox>
    </LoginDialog>
  )
}

export default LoginForm
