import React, { useState } from 'react'
import Search from './components/search'

const App = () => {
  const[searchTerm, setsearchTerm] = useState('');
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
