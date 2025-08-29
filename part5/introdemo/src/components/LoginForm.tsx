import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'

const LoginForm = ({setUser, setErrorMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(user)
        // store user in local storage
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch{
        setErrorMessage('wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}


export default LoginForm