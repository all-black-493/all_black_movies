import React, { useState, useEffect } from 'react'
import Search from './components/search'
import {API_BASE_URL} from './urls.js'
import { API_OPTIONS } from './api.js';

const API_KEY= import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const[searchTerm, setsearchTerm] = useState('');
  const fetchmovies = async() => {
    try{

    }catch(error){
      console.log(`Error Fetching Movies. This is the error: '${error}`);
    }
  }
  
  useEffect(()=>{},[searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Lights. Camera. <span className="text-gradient">Stream !</span> </h1>
        </header>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
