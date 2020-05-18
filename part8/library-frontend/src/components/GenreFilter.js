import React from "react";

const GenreFilter = ({ setGenre, books }) => {
  const genreList = () => {
    const duplicatedGenres = books.reduce((acc, cur) => {
      const filteredGenres = cur.genres.map((el) => el);
      return [...acc, ...filteredGenres];
    }, []);
    const genres = [...new Set(duplicatedGenres)];
    return genres.map((genre) => {
      return (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      );
    });
  };

  return (
    <div>
      {genreList()}
      <button key="all genres" onClick={() => setGenre("all genres")}>
        all genres
      </button>
    </div>
  );
};

export default GenreFilter;
