import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
function SelectedMovie({ selectedId, closeSelectedMovie, handleAddMovie }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  useEffect(
    function () {
      async function getMovieById() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=272af9b1&i=${selectedId}`
        );
        const data = await res.json();
        const currentMovie = {
          Title: data.Title,
          Year: data.Year,
          Released: data.Released,
          Actors: data.Actors,
          Plot: data.Plot,
          Poster: data.Poster,
          imdbRating: data.Ratings[0].Value,
          imdbID: data.imdbID,
          Runtime: data.Runtime,
          Ratings: data.Ratings,
        };
        setMovie(currentMovie);
      }
      getMovieById();
    },
    [selectedId]
  );
  useEffect(function () {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") closeSelectedMovie(selectedId);
    });
    // we need a clean up function
    // console.log("closed");
    return function () {
      document.removeEventListener("keydown", function (e) {
        if (e.code === "Escape") closeSelectedMovie(selectedId);
      });
    };
  }, []);
  useEffect(
    function () {
      document.title = movie.Title;
      // clean up
      return function () {
        document.title = "usePopcorn";
        console.log(movie.Title); // becuase of closures
      };
    },
    [movie]
  );
  function addMovieOnClick() {
    // console.log(movie);
    const newMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: movie.Ratings.at(0).Value,
      Runtime: Number(movie.Runtime.split(" ")[0]),
      userRating,
    };
    // console.log(newMovie);

    handleAddMovie(newMovie);
  }
  return (
    <div className="details">
      {movie ? (
        <>
          <header>
            <button className="btn-back" onClick={closeSelectedMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt="Poster for the movie" />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
                <span>⭐</span>
                {movie.imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                maxNumberOfStars={10}
                size={24}
                setUserRating={setUserRating}
              />
              {userRating > 0 && (
                <button
                  className="btn-add"
                  onClick={() => {
                    addMovieOnClick();
                    closeSelectedMovie();
                  }}
                >
                  + Add movie
                </button>
              )}
            </div>

            <em>{movie.Plot}</em>
            <p>
              <b>Actors:</b> {movie.Actors}
            </p>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SelectedMovie;
