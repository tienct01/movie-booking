import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function CreateSchedule() {
  const params = useParams();
  const navigate=useNavigate();
  const { scheduleId } = params;

  const [cinemaList, setCinemaList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  //   const [movieId,setMovieId]=useState();
  const [scheduleData, setScheduleData] = useState({
    cinemaId: null,
    roomId: null,
    movieId: 1,
    premiere: null,
  });
    console.log('scheduleData', scheduleData);

  const getScheduleById = async scheduleId => {
    const resultSchedule = await request.getScheduleById(scheduleId);
    // console.log('resultSchedule', resultSchedule);
    const { room_id } = resultSchedule.data[0];
    const resultCinema = await request.getCinemaByRoomId(room_id);
    const cinemaId = resultCinema.data[0].cinema_id;
    const {
      room_id: roomId,
      movie_id: movieId,
      premiere,
    } = resultSchedule.data[0];
    // const newScheduleData = { ...scheduleData };
    setScheduleData({
      cinemaId,
      roomId,
      movieId,
      premiere: moment(premiere).format('YYYY-MM-DD HH:mm'),
    });
  };

  const getCinemaList = async () => {
    const resultCinemas = await request.getCinemas();
    setCinemaList(resultCinemas.data);
    // const newScheduleData = { ...scheduleData };
    // setScheduleData({
    //   ...newScheduleData,
    //   cinemaId: resultCinemas.data[0].id,
    // });
  };

  const getRoomList = async cinemaId => {
    const resultRooms = await request.getRoomsByCinemaId(cinemaId);
    setRoomList(resultRooms.data);
    const newScheduleData = { ...scheduleData };
    setScheduleData({
      ...newScheduleData,
      roomId: resultRooms.data[0].id,
    });
  };
  const getMovieList = async () => {
    const resultMovies = await request.getMovies();
    setMovieList(resultMovies.data);
    const newScheduleData = { ...scheduleData };
    setScheduleData({
      ...newScheduleData,
      movieId: resultMovies.data[0].id,
    });
  };
  const handleChange = (name, value) => {
    const newScheduleData = { ...scheduleData };
    newScheduleData[name] = value;
    setScheduleData(newScheduleData);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('scheduleData', scheduleData);
    if(!scheduleData.cinemaId){
        toast.error('Vui lòng chọn rạp', {
            autoClose: 2000,
          });
          return;
    }
    if(!scheduleData.roomId){
        toast.error('Vui lòng chọn phòng', {
            autoClose: 2000,
          });
          return;
    }
    if(!scheduleData.movieId){
        toast.error('Vui lòng chọn phim', {
            autoClose: 2000,
          });
          return;
    }
    if(!scheduleData.premiere){
        toast.error('Vui lòng chọn thời gian', {
            autoClose: 2000,
          });
          return;
    }
    if (scheduleId) {
      const newScheduleData = { id: scheduleId, ...scheduleData };
      const result = await request.updateSchedule(newScheduleData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/schedules');    
      }
      console.log('update', result);
    } else {
      const result = await request.createSchedule(scheduleData);
      const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/admin/schedules');    
      }
      console.log('create', result);
      
    }
  };

  useEffect(() => {
    getCinemaList();
    getMovieList();
    
    if (scheduleId) {
      getScheduleById(scheduleId);
    }
    // else{
    //     console.log('scheduleId',scheduleId)
    //     setScheduleData({
    //         cinemaId: null,
    //         roomId: null,
    //         movieId: 1,
    //         premiere: null,
    //       })
    // }
  }, [scheduleId]);

  useEffect(() => {
    if (scheduleData.cinemaId) {
      getRoomList(scheduleData.cinemaId);
      
    }
  }, [scheduleData.cinemaId]);
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
                    Thêm mới lịch chiếu
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            {/* Content */}
            <div className='form-group'>
              <label htmlFor='select-cinema'>Chọn rạp:</label>
              <select
                className='form-control col-sm-6'
                id='select-cinema'
                value={scheduleData.cinemaId}
                onChange={e => handleChange('cinemaId', e.target.value)}
              >
                <option  value={null}>
                      Chọn rạp chiếu phim
                    </option>
                {cinemaList.map(cinema => {
                  return (
                    <option key={cinema.id} value={cinema.id}>
                      {cinema.name} - {cinema.city}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <c:foreach var="cinema" items="${cinemas}"> */}
            <div
              className='form-group cinema-wrapper'
              id='cinema-wrapper-${cinema.id}'
            >
              <label htmlFor='select-room-${cinema.id}'>Chọn phòng:</label>
              <select
                className='form-control select-room col-sm-6'
                id='select-room-${cinema.id}'
                value={scheduleData.roomId}
                onChange={e => handleChange('roomId', e.target.value)}
              >
                {roomList.map(room => {
                  return (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* </c:foreach> */}
            <form
              action='/admin/schedules/create'
              method='post'
              onSubmit={handleSubmit}
            >
              <div className='form-group'>
                <label htmlFor='select-movie'>Chọn phim:</label>
                <select
                  className='form-control col-sm-6'
                  name='movieId'
                  id='select-movie'
                  value={scheduleData.movieId}
                  onChange={e => handleChange('movieId', e.target.value)}
                >
                  {movieList.map(movie => {
                    return (
                      <option key={movie.id} value={movie.id}>
                        {movie.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='select-time'>Chọn giờ:</label>
                <input
                  name='time'
                  className='form-control col-sm-6'
                  id='select-time'
                  type='datetime-local'
                  required
                  value={scheduleData.premiere}
                  onChange={e => handleChange('premiere', e.target.value)}
                />
              </div>
              <input hidden name='roomId' id='room-id' />
              <button className='btn btn-primary' type='submit'>
                {scheduleId ?'Cập nhật' : 'Thêm lịch'}
              </button>
            </form>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CreateSchedule;
