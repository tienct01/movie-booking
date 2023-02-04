import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function CreateCinema() {
    const navigate=useNavigate();
  const params = useParams();
  const { cinemaId } = params;
  const [cityList, setCityList] = useState([]);
  const [cinemaData, setCinemaData] = useState({
    name: '',
    cityId: 1,
  });
  const getCities = async () => {
    const result = await request.getCities();
    setCityList(result.data);
  };

  const getCinemaInfo = async cinemaId => {
    const resultCinema = await request.getCinemaById(cinemaId);
    const { name, city_id: cityId } = resultCinema.data[0];
    setCinemaData({
      name,
      cityId,
    });
  };

  const handleChange = (name, value) => {
    const newCinemaData = { ...cinemaData };
    newCinemaData[name] = value;
    setCinemaData(newCinemaData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if(!cinemaData.name.length>0){
        toast.error('Tên rạp không được bỏ trống', {
            autoClose: 2000,
          });
          return;
    }
    if (cinemaId) {
      const newCinemaData = { id: cinemaId, ...cinemaData };
      const result = await request.updateCinema(newCinemaData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/cinemas');    
      }
      console.log('update', result);
    } else {
      const result = await request.createCinema(cinemaData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/cinemas');    
      }
      console.log('create', result);
    }
    
  };

  //   useEffect(() => {
  //     getCities();
  //   }, []);

  useEffect(() => {
    getCities();
    if (cinemaId) {
      getCinemaInfo(cinemaId);
    }
    else{
        setCinemaData({
            name: '',
            cityId: 1,
          })
    }
  }, [cinemaId]);
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
                  <li className='breadcrumb-item active'>Thêm rạp phim</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            <div className='container'>
              <form
                action='/admin/cinemas'
                method='post'
                onSubmit={handleSubmit}
              >
                <div className='row' style={{ marginBottom: '15px' }}>
                  <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                    <label>Tên</label>
                  </div>
                  <div className='col-sm-4' style={{}}>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      value={cinemaData.name}
                      onChange={e => handleChange('name', e.target.value)}
                    />
                  </div>
                </div>
                <div className='row' style={{ marginBottom: '15px' }}>
                  <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                    <label>Thành phố</label>
                  </div>
                  <div className='col-sm-4' style={{}}>
                    <select
                      name='cityId'
                      className='form-control'
                      value={cinemaData.cityId}
                      onChange={e => handleChange('cityId', e.target.value)}
                    >
                      {cityList.map(city => {
                        return (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className='row' style={{ marginBottom: '15px' }}>
                  <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                    <label />
                  </div>
                  <div className='col-sm-4' style={{}}>
                    <button type='submit' className='btn btn-primary'>
                      {cinemaId ? 'Cập nhật' : 'Thêm'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateCinema;
