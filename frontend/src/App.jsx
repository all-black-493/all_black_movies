import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const MovieCard = ({title, rating, actors}) => {
  return (
    <div className="movie-card">
      <p>
        {title} - {rating} stars. The actor{(actors ?? []).length > 1? 's':''} of this movie {(actors ?? []).length === 1 ? 'is' : 'are'} {' '}
        {(actors ?? []).map((actor) => actor.actor_name).join(', ') || 'N/A'} 
        </p>
    </div>
  );
}

const App = () => {
  return(
  
  <>
  <h2>Hello</h2>
  <MovieCard title={'SpiderMan'} rating={3} actors={[{actor_name:'Tobey MaGuire'},{actor_name:'Natasha Romanoff'}]} />
  <MovieCard title={'Avengers Endgame'} rating={4} actors={[{actor_name:'Robert Downey Junior'}]}/>
  <MovieCard title={'Moon Knight'} rating={3} actors={[{actor_name:'Oscar Isaac'}]}/>
  <MovieCard title={'Sentry'} rating={2} actors={[{actor_name:'Chris Evans'}]}/>
  <MovieCard title={'Avengers Doomsday'} rating={4} actors={[{actor_name:'Letitia Wright'},{actor_name:'Benedict Cumberbatch'}]}/>

  </>    
  );
}

export default App
