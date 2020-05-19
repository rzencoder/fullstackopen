import React from "react";

const Recommendations = ({ user, show, books }) => {
  if (!show) {
    return null;
  }

  const booksList = () => {
    const filter = (book) => book.genres.includes(user.favoriteGenre);
    let filteredBooks = books.filter(filter);
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
      <h2>Recommendations</h2>
      <div>books in your favourite genre {user.favoriteGenre}</div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksList()}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
