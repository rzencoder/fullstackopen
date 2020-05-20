import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { RECOMMENDED_BOOKS } from "../graphql/queries";

const Recommendations = ({ user, show, books }) => {
  const [getFavBooks, favBooksResult] = useLazyQuery(RECOMMENDED_BOOKS);

  useEffect(() => {
    getFavBooks({ variables: { genre: "drama" } });
  }, [user]);

  if (!show) {
    return null;
  }

  const booksList = () => {
    return favBooksResult.data.allBooks.map((a) => (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favourite genre {user.favoriteGenre}</div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooksResult.data && booksList()}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
