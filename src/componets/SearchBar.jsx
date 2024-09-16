import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar país..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
