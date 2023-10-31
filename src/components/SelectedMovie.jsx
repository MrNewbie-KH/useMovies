import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
function SelectedMovie({ selectedId, closeSelectedMovie }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getMovieById() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=272af9b1&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        console.log(data);
        setIsLoading(false);
      }
      getMovieById();
    },
    [selectedId]
  ); // Change the dependency to selectedId

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
                {movie.Released} &bull; {movie.runtime}
                <span>⭐</span>
                {movie.Ratings[0].Value}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxNumberOfStars={10} size={24} />
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
