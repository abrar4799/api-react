import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading , setisLoading] = useState(false)
  const [error , setError] = useState(null)
  /**
   * use 
   * !useEffect
   * ?fetch API Immediately 
   */
 

  async function fetchMoviesHandler() {
    setisLoading(true)
    setError(null)
    try{
    const response = await fetch("https://react-api-b97f6-default-rtdb.firebaseio.com/movies.json");
    

    if(!response.ok){
      throw new Error('Somethings went wrong!')
    }
    const data = await response.json();
    const LoadedMovie = []
    for (const key in data){
      LoadedMovie.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseData: data[key].releaseData
      })

    }

  /*  const transformedMovie = data.result.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseData: movieData.release_date,
      };
    });
    console.log(transformedMovie);*/
    setMovies(LoadedMovie);
  
  }catch (error){
     setError(error.message)

  }
  setisLoading(false)

  }
  useEffect(() => {
    fetchMoviesHandler();
  } , [])

 async function addMovieHandler(movie){
 const response =   await  fetch("https://react-api-b97f6-default-rtdb.firebaseio.com/movies.json" , {
      method: 'POST' ,
      body: JSON.stringify( movie ) ,
      headers :{
        'Content-Type' : 'application/json'
      }
    });
  const data = await response.json()
  console.log(data)  
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie  onAddMovie={addMovieHandler}/>
      </section>
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
