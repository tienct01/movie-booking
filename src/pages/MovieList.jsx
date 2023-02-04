import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import request from '../api/request';

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const getMovies = async () => {
    const result = await request.getMovies();
    setMovieList(result.data);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <Navbar />

      <section className='container'>
        <div className='col-sm-12'>
          <h2 className='page-heading'>Movies</h2>
          {/* <c:foreach var='movie' items='${allMovies}'> */}
          {/* Movie preview item */}
          {movieList.map(movie=>{
            return <div key={movie.id} className='movie movie--preview movie--full release'>
            <div className='col-sm-3 col-md-2 col-lg-2'>
              <div className='movie__images'>
                <img alt={movie.name} src={movie.image} />
              </div>
            </div>
            <div className='col-sm-9 col-md-10 col-lg-10 movie__about'>
              <Link
                to={`/movies/${movie.id}`}
                className='movie__title link--huge'
              >
                {movie.name}
              </Link>
              <p className='movie__time'>
                {movie.time} phút
              </p>
              <div className='movie__btns'>
                <Link
                  to={`/movies/${movie.id}`}
                  className='btn btn-md btn--warning'
                >
                  Xem chi tiết <span className='hidden-sm'>phim</span>
                </Link>
                <a
                  href={`/booking/${movie.id}`}
                  className='watchlist'
                >
                  Mua vé
                </a>
              </div>
              <div className='preview-footer'></div>
            </div>
            <div className='clearfix' />
          </div>
          })}
          {/* end movie preview item */}
          {/* </c:foreach> */}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MovieList;
