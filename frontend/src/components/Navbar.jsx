import React, { useState, useEffect } from 'react'
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { API_OPTIONS } from '../api.js';
import { API_BASE_URL } from '../urls';

const Navbar = ({ className })=> {
  const [active, setActive] = useState('');
  const[popularMovies, setPopularMovies] = useState([]);

  const fetchpopularmovies = async() => {
  
      try{
        const endpoint=`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
        const response = await fetch(endpoint,API_OPTIONS);
        if(!response.ok){
          throw new Error('Failed to fetch popular movies')
        } 
        const data = await response.json();
  
        if(data.results === 'False'){
          console.error("No Popular Movie Results")
        }
        console.log(data.results);
        const four_popular = data.results.slice(0,4);
        setPopularMovies(four_popular);
        console.log(popularMovies);

      }catch(error){
        console.error(`Error Fetching Movies. Error Details: '${error}`);
      }
    }

useEffect(() => {
    if (active === "Popular") {
      fetchpopularmovies();
    }
  }, [active]);
      

  return (
    <div
  className={cn("text-base text-gray-200 py-1 px-2 mt-2 max-w-2xl mx-auto fixed top-3 inset-x-0 z-50 p-1 mt-2 px-50", className)}
>

      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Genre">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/action">Action</HoveredLink>
            <HoveredLink href="/comedy">Comedy</HoveredLink>
            <HoveredLink href="/drama">Drama</HoveredLink>
            <HoveredLink href="/horror">Horror</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Popular">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">

            {popularMovies.map((movie)=>(
                <ProductItem
                key={movie.id}
                title={movie.title}
                src={movie.poster_path?
                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}`:'/no-movie.png'
                  }
                description={movie.overview}
              />
            ))}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Recent">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#">X-Men</HoveredLink>
            <HoveredLink href="#">What If?</HoveredLink>
            <HoveredLink href="#">Avengers</HoveredLink>
            <HoveredLink href="#">The Gardener</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Navbar
