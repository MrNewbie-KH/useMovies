import { useEffect, useRef, useState } from "react";
function Search({ query, setQuery }) {
  // focusing using useRef
  const inputElemenet = useRef(null);
  useEffect(function () {
    inputElemenet.current.focus();
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElemenet}
    />
  );
}
export default Search;
