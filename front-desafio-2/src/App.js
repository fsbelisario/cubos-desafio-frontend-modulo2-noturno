import './App.css';
import { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard'
import ShoppingCart from './components/ShoppingCart'

function App() {
  const baseURL = 'https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR';

  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [shoppingCartItems, setShoppingCartItems] = useState([]);
  const finalPrice = useRef(0);

  useEffect(() => {
    //Alimenta lista completa de filmes
    populateMoviesList();
  }, [])

  useEffect(() => {
    //Prepara lista top 5
    const list = [...movies];
    const top = list.sort((a, b) => {
      return b.voteAverage > a.voteAverage ? 1 : -1;
    });
    setTopMovies(top.splice(0, 5));
  }, [movies])

  async function populateMoviesList() {
    const response = await fetch(baseURL, {
      method: 'GET'
    });
    const rawMoviesList = await response.json();

    const processedMoviesList = [];

    //Alimenta o array processedMoviesList com os dados desejados do retorno da API
    for (const movie of rawMoviesList.results) {
      processedMoviesList.push({
        title: movie.title,
        posterPath: movie.poster_path,
        voteAverage: movie.vote_average,
        price: movie.price,
        shoppingCartQty: 0
      })
    }
    setMovies(processedMoviesList);
  }

  function handleShoppingCart(value, movie) {
    //Contabiliza movimnetação (incremento ou decremento de quantidade ou esvaziamento do carrinho)
    const localMoviesDB = [...movies];
    const movieIndex = localMoviesDB.findIndex(item => item.title === movie);
    if (movieIndex === -1) {
      return;
    }
    finalPrice.current += (value * localMoviesDB[movieIndex].price);
    const newQty = localMoviesDB[movieIndex].shoppingCartQty + value;
    if (newQty >= 0) {
      localMoviesDB[movieIndex].shoppingCartQty = newQty;
    }

    //Atualiza estado de filmes
    setMovies([...localMoviesDB]);

    //Atualiza e ordena estado do carrinho
    setShoppingCartItems(localMoviesDB.filter((movie) => {
      return movie.shoppingCartQty > 0
    }).sort((a, b) => {
      return b.title < a.title ? 1 : -1;
    }));
  }

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="main-content">
          <h1 className="top-movies-title">Top Filmes</h1>
          <div className="top-movies">
            {topMovies.map(movie => (<MovieCard key={movie.title} movie={movie} handleShoppingCart={handleShoppingCart} />))}
          </div>
          <h1 className="movies-list-title">Filmes</h1>
          <div className="movies-list">
            {movies.map(movie => (<MovieCard key={movie.title} movie={movie} handleShoppingCart={handleShoppingCart} />))}
          </div>
        </div>
        <ShoppingCart shoppingCartItems={shoppingCartItems} handleShoppingCart={handleShoppingCart} finalPrice={finalPrice.current} />
      </div>
    </div >
  );
}

export default App;