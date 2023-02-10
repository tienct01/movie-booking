import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
function Movie() {
    const navigate=useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({
    id: null,
  });
  const [currentCategories, setCurrentCategories] = useState([]);
  const handleDelete = async () => {
    const result = await request.deleteMovie(currentMovie.id);
    const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          getMovies();
      }
  };

  console.log('currentCategories', currentCategories);
  const getMovies = async () => {
    const result = await request.getMovies();
    setMovieList(result.data);
    setCurrentMovie(result.data[0]);
  };
  const getCategories = async movieId => {
    const result = await request.getCategoriesByMovieId(movieId);
    setCurrentCategories(result.data);
  };

  useEffect(() => {
    getMovies();
   
  }, []);

  useEffect(() => {
    if (currentMovie?.id) {
      getCategories(currentMovie?.id);
    }
  }, [currentMovie?.id]);

  return (
    <div className='wrapper'>
      <Nav />
      <Menu />
      <div className='content-wrapper'>
        <div className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'></div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-sm-right'>
                  <li className='breadcrumb-item'>
                    <a href='/admin'>Home</a>
                  </li>
                  <li className='breadcrumb-item active'>
                    Danh sách các bộ phim
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            {/* Content */}
            <div className='row'>
              <div className='col-sm-3'>
                <div className='list-group movie-list'>
                  {movieList.map(movie => {
                    return (
                      <Link
                        to='#'
                        key={movie.id}
                        onClick={() => setCurrentMovie(movie)}
                        className='list-group-item'
                      >
                        {movie.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className='col-sm-9'>
                <div
                  className='modal fade'
                  id='exampleModal'
                  tabIndex={-1}
                  role='dialog'
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>
                          Xác nhận
                        </h5>
                        <button
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          aria-label='Close'
                        >
                          <span aria-hidden='true'>×</span>
                        </button>
                      </div>
                      <div className='modal-body'>
                        Bạn muốn kết thúc bộ phim này?
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Đóng
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          data-dismiss='modal'
                          onClick={handleDelete}
                        >
                          Kết thúc
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <c:foreach var='movie' items='${movies}'> */}
                {currentMovie && (
                  <div className='info-movie' id='info-movie-${movie.id}'>
                    <div
                      id='detail-movie-${movie.id}'
                      style={{ marginLeft: '150px' }}
                    >
                      <h2>{currentMovie.name}</h2>
                      <br />
                      <img
                        width={120}
                        height={160}
                        src={currentMovie.image}
                        alt='movie'
                      />
                      <br />
                      <br />
                      <label>Tác giả:</label> {currentMovie.director}
                      <br />
                      <br />
                      <label>Miêu tả:</label> {currentMovie.description}
                      <br />
                      <br />
                      <label>Thể loại:</label>{' '}
                      {currentCategories.map(c => c.name).join(', ')}
                      <br />
                      <br />
                      <label>Ra mắt:</label>{' '}
                      {moment(currentMovie.timeRelease).format('DD-MM-YYYY')}
                      <br />
                      <br />
                      <label>Thời gian:</label> {currentMovie.time}
                      <br />
                      <br />
                      <label>Ngôn ngữ:</label> {currentMovie.language}
                      <br />
                      <br />
                      <label>Định dạng:</label> {currentMovie.format}
                      <br />
                      <br />
                      <label>Độ tuổi:</label>{' '}
                      {currentMovie.ageLimit === 0 ? 13 : currentMovie.ageLimit}
                      <br />
                      <br />
                      <Link to={`/admin/movies/${currentMovie.id}`}>
                        <button
                          type='button'
                          className='btn btn-primary btn-update-movie'
                        >
                          Cập nhật
                        </button>
                      </Link>
                      <button
                        type='button'
                        data-toggle='modal'
                        data-target='#exampleModal'
                        data-movie-id='${movie.id}'
                        className='btn btn-danger movie-delete-action'
                      >
                        Kết thúc phim
                      </button>
                    </div>
                  </div>
                )}
                {/* </c:foreach> */}
              </div>
            </div>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Movie;
