import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const App = () => {
  const client = useApolloClient();
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      setToken(token);
      setPage("books");
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    setPage("login");
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <LoginForm
        setToken={setToken}
        show={page === "login"}
        onLogin={() => setPage("books")}
      />

      <Recommendations show={page === "recommend"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
