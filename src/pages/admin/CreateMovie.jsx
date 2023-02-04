import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import moment from 'moment';
import FileBase64 from 'react-file-base64';
import { useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';

function CreateMovie() {
  const params = useParams();
  const navigate=useNavigate();
  const { movieId } = params;
  const [categoryList, setCategoryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [formatList, setFormatList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const getCategoryList = async () => {
    const resultCategories = await request.getCategories();
    const resultLanguages = await request.getLanguages();
    const resultFormats = await request.getFormats();
    const resultCountries = await request.getCountries();
    setCategoryList(resultCategories.data);
    setLanguageList(resultLanguages.data);
    setFormatList(resultFormats.data);
    setCountryList(resultCountries.data);
  };

  const [movieData, setMovieData] = useState({
    name: '',
    director: '',
    categoryId: 1,
    timeRelease: null,
    time: 0,
    languageId: 1,
    countryId: 1,
    formatId: 1,
    ageLimit: 0,
    image: null,
    description: '',
  });
  console.log('movieData', movieData);


  const getMovieInfo = async movieId => {
    const resultMovie = await request.getMovieById(movieId);
    const resultCategory = await request.getCategoriesByMovieId(movieId);
    const {
      name,
      director,
      timeRelease,
      time,
      language_id,
      country_id,
      format_id,
      ageLimit,
      image,
      description,
    } = resultMovie.data[0];
    const { id: category_id } = resultCategory.data[0];
    setMovieData({
      name,
      director,
      timeRelease: moment(timeRelease).format('YYYY-MM-DD'),
      time,
      languageId: language_id,
      countryId: country_id,
      formatId: format_id,
      categoryId: category_id,
      ageLimit,
      image,
      description,
    });
  };

  const handleChange = (name, value) => {
    const newMovieData = { ...movieData };
    newMovieData[name] = value;
    setMovieData(newMovieData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (movieId) {
      const newMovieData = { id: movieId, ...movieData };
      const result = await request.updateMovie(newMovieData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/movies');    
      }
    } else {
      const result = await request.createMovie(movieData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/movies');    
      }
    }
  };

  useEffect(() => {
    getCategoryList();
    if (movieId) {
      getMovieInfo(movieId);
    } else {
      setMovieData({
        name: '',
        director: '',
        categoryId: 1,
        timeRelease: null,
        time: 0,
        languageId: 1,
        countryId: 1,
        formatId: 1,
        ageLimit: 0,
        image: null,
        description: '',
      });
    }
  }, [movieId]);
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
                  <li className='breadcrumb-item active'>Thêm mới bộ phim</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            <form
              action='/movies'
              method='post'
              encType='multipart/form-data'
              onSubmit={handleSubmit}
            >
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Tên phim</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    required
                    value={movieData.name}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Đạo diễn</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='text'
                    className='form-control'
                    name='director'
                    required
                    value={movieData.director}
                    onChange={e => handleChange('director', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Thể loại</labe>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='categoryId'
                    className='form-control'
                    value={movieData.categoryId}
                    onChange={e => handleChange('categoryId', e.target.value)}
                  >
                    {categoryList.map(category => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Ngày chiếu</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='date'
                    className='form-control'
                    name='timeRelease'
                    required
                    value={movieData.timeRelease}
                    onChange={e => handleChange('timeRelease', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Thời gian</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='number'
                    className='form-control'
                    name='time'
                    required
                    value={movieData.time}
                    onChange={e => handleChange('time', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Quốc gia</labe>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='languageId'
                    className='form-control'
                    value={movieData.countryId}
                    onChange={e => handleChange('countryId', e.target.value)}
                  >
                    {countryList.map(country => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Ngôn ngữ</labe>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='languageId'
                    className='form-control'
                    value={movieData.languageId}
                    onChange={e => handleChange('languageId', e.target.value)}
                  >
                    {languageList.map(language => {
                      return (
                        <option key={language.id} value={language.id}>
                          {language.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Định dạng</labe>
                </div>
                <div className='col-sm-4'>
                  <select
                    name='formatId'
                    className='form-control'
                    value={movieData.formatId}
                    onChange={e => handleChange('formatId', e.target.value)}
                  >
                    {formatList.map(format => {
                      return (
                        <option key={format.id} value={format.id}>
                          {format.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Độ tuổi</labe>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='number'
                    className='form-control'
                    name='ageLimit'
                    required
                    value={movieData.ageLimit}
                    onChange={e => handleChange('ageLimit', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Hình ảnh</labe>
                </div>
                <div className='col-sm-4'>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setMovieData({ ...movieData, image: base64 });
                    }}
                  />
                  {/* <input
                    type='file'
                    className='form-control-file'
                    name='image'
                    // value={movieData.image}
                    onChange={e => handleChange('image', e.target.files[0])}
                  /> */}
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Miêu tả</labe>
                </div>
                <div className='col-sm-4'>
                  <textarea
                    name='description'
                    cols={30}
                    rows={5}
                    className='form-control'
                    value={movieData.description}
                    onChange={e => handleChange('description', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe />
                </div>
                <div className='col-sm-4'>
                  <button type='submit' className='btn btn-primary'>
                    {movieId ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateMovie;
