import React, { useState, useEffect } from 'react'
import Search from './components/search'
import {API_BASE_URL} from './urls.js'
import { API_OPTIONS } from './api.js';
import { Loadspinner } from './components/loadspinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js';


const App = () => {
  const[searchTerm, setsearchTerm] = useState('');
  const[errorMessage, seterrorMessage] = useState('');
  const[movies, setMovies] = useState([]);
  const[trendingMovies,setTrendingMovies] = useState([]);
  const[loading, setisLoading] = useState(false);
  const[debouncedsearchTerm, setdebouncesearchTerm]=useState('');

  useDebounce(()=>setdebouncesearchTerm(searchTerm), 2000,[searchTerm])

  const loadTrendingMovies = async()=>{
    try{
      const result = await getTrendingMovies();
      setTrendingMovies(result);
    }catch(error){
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  const fetchmovies = async(query='') => {
    setisLoading(true);
    seterrorMessage('');

    try{
      const endpoint=query
      ? (`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`)
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);
      if(!response.ok){
        throw new error('Failed to fetch movies')
      } 
      const data = await response.json();

      if(data.results === 'False'){
        seterrorMessage(data.Error)
        setMovies([])
      }
      setMovies(data.results)
      // console.log(data);
      if(query && data.results.length>0){
        updateSearchCount(query, data.results[0]);
      }

    }catch(error){
      console.error(`Error Fetching Movies. Error Details: '${error}`);
      seterrorMessage('Error Fetching Movies. Please Try again later');
    }finally{
      setisLoading(false)
    }
  }

  useEffect(()=>{
    loadTrendingMovies();
  },[])
  
  useEffect(()=>{
    fetchmovies(debouncedsearchTerm);
  },[debouncedsearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Lights. Camera. <span className="text-gradient">Stream !</span> </h1>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        
        {trendingMovies.length>0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
          </section>
        )}

        <section className="all-movies">
          <h2>Popular Movies</h2>
          <h2>
            {loading ?
            (
              <Loadspinner />
            ): errorMessage ? (
              <p className="text-red-500">
                {errorMessage}
              </p>
            ):(
              <ul>
                {movies.map((movie)=>(
                  <MovieCard key={movie.id} movie={movie} />
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
