import React, { useState } from "react";
import GenreFilter from "./GenreFilter";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");
  if (!props.show) {
    return null;
  }

  const books = props.books;

  const booksList = () => {
    const filter = (book) => book.genres.includes(genre);
    let filteredBooks = [...books];
    if (genre !== "all genres") {
      filteredBooks = books.filter(filter);
    }
    return filteredBooks.map((a) => (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksList()}
        </tbody>
      </table>
      <GenreFilter setGenre={setGenre} books={books} />
    </div>
  );
};

export default Books;
