import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, onLogin, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN);

  const submit = async (event) => {
    event.preventDefault();
    const result = await login({ variables: { username, password } });
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setUsername("");
      setPassword("");
      onLogin();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
