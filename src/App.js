import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading , setisLoading] = useState(false)
  const [error , setError] = useState(null)

  async function fetchMoviesHandler() {
    setisLoading(true)
    setError(null)
    try{
    const response = await fetch("https://swapi.dev/api/films/");
    

    if(!response.ok){
      throw new Error('Somethings went wrong!')
    }
    const data = await response.json();
    const transformedMovie = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseData: movieData.release_date,
      };
    });
    console.log(transformedMovie);
    setMovies(transformedMovie);
  
  }catch (error){
     setError(error.message)

  }
  setisLoading(false)

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      { !isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      { !isLoading && movies.length === 0 && <p>No Movies Found. </p> }
      {!isLoading && error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
