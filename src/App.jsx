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
import SelectedMovie from "./components/SelectedMovie";
export default function App() {
  // top level code is render logic
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);
  // instead let's use a callback
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem("watched"));
  });

  function openSelectedMovie(id) {
    setSelectedId(() => (id === selectedId ? null : id));
  }
  function closeSelectedMovie(id) {
    setSelectedId(null);
  }
  function handleAddMovie(movie) {
    const index = watched.findIndex((item) => {
      return item.imdbID === movie.imdbID;
    });
    // console.log(index);
    if (index === -1) setWatched((current) => [...current, movie]);
    else {
      const newArray = watched.map((item, idx) => {
        if (idx === index) return movie;
        else return item;
      });
      setWatched(newArray);
    }
  }
  function handleDeleteWatchedMovie(id) {
    setWatched((current) => {
      return current.filter((m) => m.imdbID !== id);
    });
  }
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=272af9b1&s=${query}`
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
            <MovieList
              movies={movies}
              closeSelectedMovie={closeSelectedMovie}
              openSelectedMovie={openSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              closeSelectedMovie={closeSelectedMovie}
              handleAddMovie={handleAddMovie}
            />
          ) : (
            <>
              <Watchedsummary watched={watched} movies={movies} />
              <WatchedList
                watched={watched}
                handleDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
