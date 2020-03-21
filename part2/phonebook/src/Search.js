import React from "react";

const Search = ({ handleSearchChange, newSearch }) => {
  return (
    <div>
      filter shown with:
      <input onChange={handleSearchChange} value={newSearch} />
    </div>
  );
};

export default Search;
