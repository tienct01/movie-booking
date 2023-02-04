import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../api/request';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function Booking() {
  const params = useParams();
  const { movieId } = params;
  const [days, setDays] = useState([]);
  const [cities, setCities] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [data, setData] = useState({
    day: null,
    cityId: null,
    cinemaId: null,
  });
  console.log('data',data);
  const getCities = async () => {
    const result = await request.getCities();
    setCities(result.data);
    const newData = { ...data };
    newData.cityId = result.data[0].id;
    setData(newData);
  };

  const getCinemas = async cityId => {
    const result = await request.getCinemaByCityId(cityId);
    setCinemas(result?.data);
    handleData('cinemaId', result?.data[0]?.id);
  };

  const getSchedules = async data => {
    const result = await request.getSchedulesByCinema({
      day: data.day,
      cinemaId: data.cinemaId,
      movieId: movieId,
    });
    setSchedules(result?.data);
  };

  useEffect(() => {
    if (data.day && data.cinemaId) {
      getSchedules(data);
    } else {
      setSchedules([]);
    }
  }, [data]);

  const handleData = (name, value) => {
    const newData = { ...data };
    newData[name] = value;
    if (name === 'cityId') {
      //   setSchedules()
    }
    setData(newData);
  };

  useEffect(() => {
    const today = moment();
    const newDays = [];
    for (let i = 0; i < 28; i++) {
      newDays.push(moment(today).add(i, 'days'));
    }
    setDays(newDays);
    getCities();
    handleData('day', moment(today).format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    if (data.cityId) {
      getCinemas(data.cityId);
    }
  }, [data.cityId]);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div>
          <ul className='pagination'>
            {days.map((day, index) => (
              <li
                className={
                  day.format('YYYY-MM-DD') === data.day ? 'active' : ''
                }
              >
                <a
                  style={{
                    marginBottom: '10px',
                    display: 'block',
                  }}
                  href='#'
                  onClick={() => handleData('day', day.format('YYYY-MM-DD'))}
                >
                  {day.format('DD-MM-YYYY')}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className='pagination'>
            {cities.map(city => {
              return (
                <li
                  key={city.id}
                  className={city.id === data.cityId ? 'active' : ''}
                >
                  <a
                    style={{
                      marginBottom: '10px',
                      display: 'block',
                    }}
                    href='#'
                    onClick={() => {
                      handleData('cityId', city.id);
                    }}
                  >
                    {city.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <ul className='pagination'>
            {cinemas.map(cinema => {
              return (
                <li
                  key={cinema.id}
                  className={cinema.id === data.cinemaId ? 'active' : ''}
                >
                  <a href='#' onClick={() => handleData('cinemaId', cinema.id)}>
                    {cinema.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {/* <c:choose> */}
          {/* <c:when test="${cinemas.size() != 0}"> */}
          {/* <c:foreach items="${cinemas}" var="cinema"> */}
          {/* <label>
            ${'{'}cinema.name{'}'}
          </label> */}
          {schedules.length > 0 ? (
            <ul>
              {/* <c:foreach items="${cinema.schedules}" var="schedule"> */}
              {schedules.map(schedule => {
                return (
                  <li
                    key={schedule.id}
                    style={{
                      display: 'inline-block',
                      marginRight: '10px',
                    }}
                  >
                    <a
                      className='btn-primary btn'
                      role='button'
                      href={`/booking-chair/${schedule.id}`}
                    >
                      <span>{schedule.room_name}</span>
                      <br />
                      <span>{moment(schedule.premiere).format('HH:mm')}</span>
                    </a>
                  </li>
                );
              })}
              {/* </c:foreach> */}
            </ul>
          ) : (
            <p>Xin lỗi chưa có lịch chiếu!</p>
          )}

          {/* </c:foreach> */}
          {/* </c:when> */}
          {/* <c:otherwise> */}

          {/* </c:otherwise> */}
          {/* </c:choose> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Booking;
