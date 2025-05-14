import React, { useState, useEffect } from 'react'
import Search from './components/search'
import {API_BASE_URL} from './urls.js'
import { API_OPTIONS } from './api.js';

const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const[searchTerm, setsearchTerm] = useState('');
  const[errorMessage, seterrorMessage] = useState('');
  const[movies, setMovies] = useState([]);
  const[loading, setisLoading] = useState(false);

  const fetchmovies = async() => {
    setisLoading(true);
    seterrorMessage('');
    try{
      const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new error('Failed to fetch movies')
      } 
      const data = await response.json();

      if(data.response === 'False'){
        seterrorMessage(data.Error)
        setMovies([])
      }
      setMovies(data.results)

    }catch(error){
      console.error(`Error Fetching Movies. Error Details: '${error}`);
      seterrorMessage('Error Fetching Movies. Please Try again later');
    }finally{
      setisLoading(false)
    }
  }

  useEffect(()=>{
    fetchmovies();
  },[]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Lights. Camera. <span className="text-gradient">Stream !</span> </h1>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>
        <section className="all-movies">
          <h2>
            {loading ?
            (
              <p className="text-white">
                Loading ...
              </p>
            ): errorMessage ? (
              <p className="text-red-500">
                {errorMessage}
              </p>
            ):(
              <ul>
                {movies.map((movie)=>(
                  <p key={movie.id} className="text-white">
                    {movie.title}
                  </p>
                ))}
              </ul>
            )
          }
            </h2>
        </section>
      </div>
    </main>
  )
}

export default App
