import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import request from '../api/request';

function MovieDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const { movieId } = params;
  const [movieData, setMovieData] = useState();
  const [categoryList, setCategoryList] = useState([]);
  console.log('categoryList', categoryList);
  const getMovieInfo = async movieId => {
    const resultMovie = await request.getMovieById(movieId);
    if (resultMovie.data.length === 0) {
      navigate('/error');
    }
    setMovieData(resultMovie.data[0]);
  };

  const getCategoryList = async movieId => {
    const resultCategory = await request.getCategoriesByMovieId(movieId);
    setCategoryList(resultCategory.data);
  };

  useEffect(() => {
    getMovieInfo(movieId);
    getCategoryList(movieId);
  }, [movieId]);
  return (
    <div>
      <Navbar />
      <section className='container'>
        <div className='col-sm-12'>
          {movieData && (
            <div className='movie'>
              <h2 className='page-heading'>Phim: {movieData.name}</h2>
              <div className='movie__info'>
                <div className='col-sm-4 col-md-3 movie-mobile'>
                  <div className='movie__images'>
                    <img alt='' src={movieData.image} />
                  </div>
                </div>
                <div className='col-sm-8 col-md-9'>
                  <Link
                    to={`/movies/${movieData.id}`}
                    className='movie__title link--huge'
                  >
                    {movieData.name}
                  </Link>
                  <p className='movie__time'>{movieData.time} phút</p>
                  <p className='movie__option'>
                    <strong>Quốc gia: </strong>
                    {movieData.country}
                  </p>
                  <p className='movie__option'>
                    <strong>Ngôn ngữ: </strong>
                    {movieData.language}
                  </p>
                  <p className='movie__option'>
                    <strong>Thể loại: </strong>
                    {categoryList.map(category => category.name).join(', ')}
                  </p>
                  <p className='movie__option'>
                    <strong>Ngày chiếu: </strong>
                    {moment(movieData.timeRelease).format('DD-MM-YYYY')}
                  </p>
                  <p className='movie__option'>
                    <strong>Đạo diễn: </strong>
                    {movieData.director}
                  </p>
                  <p className='movie__option'>
                    <strong>Định dạng: </strong>
                    {movieData.format}
                  </p>
                  <p className='movie__option'>
                    <strong>Lượt xem: </strong>
                    {movieData.view}
                  </p>
                  <p className='movie__option'>
                    <strong>Giới hạn tuổi: </strong>
                    {movieData.ageLimit}
                  </p>
                  {/*  nếu giới hạn tuổi là 0 trong database thì gán là 13  */}
                </div>
              </div>
              <div className='clearfix' />
              <h2 className='page-heading'>Chi tiết</h2>
              <p className='movie__describe'>{movieData.description}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MovieDetail;
