import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom'
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

// function ML(props) {
//   return <MovieList props={}/>
// }

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);
  console.log(movieList);
  // console.log(savedList);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // let movieMap = movieList.map(x => {
  //   return `/movies/${x.id}`;
  // })
  // console.log(movieMap);
  // const fetchMovies = id => Promise.resolve(
  //   movieList.find(movie => movie.id == id)
  // );

  // const Movie1 = props => {
  //   const {id} = props.match.params;
  //   const [movie, setMovie] = useState(null);

  //   useEffect(() => {
  //     fetchMovies(id).then(movie => setMovie(movie));
  //   }, [id])

  //   if (!movie) return <div>Fetching movie...</div>
  //   return( <div>The movie is {movie.name}</div> );
  // }
  // console.log(Movie1);

  return (
    <div>
      <SavedList list={savedList} />
      {/* <Link to={ML}>Movies</Link> */}

      <Route exact path='/'>
        <MovieList movies={movieList}/>
      </Route>
      <Route path='/movies/:id'>
        <Movie/>
      </Route>
    </div>
  );
};

export default App;
