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

export default function App() {
  // top level code is render logic
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("batman");
  const [isLoading, setIsLoading] = useState(false);
  // here re-rendering is done million times
  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=272af9b1&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
    }
    fetchData();
  }, []);

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
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
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
