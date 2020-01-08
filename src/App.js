import React from 'react';
import './App.css';
import Movie from './Movie.js';
import Axios from 'axios';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  //async getMovies() {
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await Axios.get('https://yts-proxy.now.sh/list_movies.json');
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          movies.map(movie => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                year={movie.year}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            );
          })
        )}
      </section>
    );
  }
}

export default App;
