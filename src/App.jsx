import { useEffect, useState } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Logo from "./components/Logo";
import Box from "./components/Box";
// import Watchedbox from "./components/Watchedbox";
import MovieList from "./components/Movielist";
import WatchedList from "./components/WatchedList";
import Watchedsummary from "./components/Watchedsummary";
import Loader from "./components/Loader";
import Error from "./components/Error";

export default function App() {
  // top level code is render logic
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  // here re-rendering is done million times
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=272af9b1&s=${query}`
        );
        // user lose connection
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movies");
        setMovies(data.Search);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
      if (!query.length) {
        setMovies([]);
        setIsError("");
        return;
      }
    }
    fetchData();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </Navbar>
      <Main>
        <Box>
          {isError ? (
            <Error message={isError} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} />
          )}
        </Box>
        <Box>
          <>
            <Watchedsummary watched={watched} movies={movies} />
            <WatchedList watched={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}
