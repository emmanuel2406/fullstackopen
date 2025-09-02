import React, { useState } from 'react'

const LoginForm = ({
  loginUser
 }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    loginUser({username, password})
    setUsername('')
    setPassword('')
  }

 return (
   <div>
     <h2>Login</h2>

     <form onSubmit={handleLogin}>
       <div>
        <label>
          username
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
         </label>
       </div>
       <div>
        <label>
          password
         <input
           type="password"
           value={password}
          onChange={event => setPassword(event.target.value)}
          />
         </label>
     </div>
       <button type="submit">login</button>
     </form>
   </div>
 )
}

export default LoginForm
