import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import LoginForm from "./components/LoginForm";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, USER } from "./graphql/queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null);
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useEffect(() => {
    if (token) {
      client
        .query({
          query: USER,
        })
        .then((response) => setUser(response.data.me));
    } else if (!token) {
      setUser(null);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    setPage("authors");
    localStorage.clear();
    client.resetStore();
  };

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>Login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              Recommendations
            </button>
            <button onClick={() => logout()}>Logout</button>
          </>
        )}
      </div>

      <Authors
        authors={authorsResult.data.allAuthors}
        show={page === "authors"}
      />
      <Books books={booksResult.data.allBooks} show={page === "books"} />
      {user && (
        <>
          <NewBook user={user} show={page === "add"} />
          <Recommendations
            show={page === "recommendations"}
            user={user}
            books={booksResult.data.allBooks}
          />
        </>
      )}
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
