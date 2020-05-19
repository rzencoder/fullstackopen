import React, { useState } from "react";
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
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const userResult = useQuery(USER);
  const client = useApolloClient();

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

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
      <NewBook show={page === "add"} />
      {userResult && (
        <Recommendations
          show={page === "recommendations"}
          user={userResult.data.me}
          books={booksResult.data.allBooks}
        />
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
