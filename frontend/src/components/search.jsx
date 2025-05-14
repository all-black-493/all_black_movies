import React from 'react'

const search = ({ searchTerm, setsearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="search.svg" alt="search" />
            <input 
            type="text"
            placeholder='Search the movie for the hour'
            value={searchTerm}
            onChange={(event)=> setsearchTerm(event.target.value)} />
        </div>
    </div>
  )
}

export default search
