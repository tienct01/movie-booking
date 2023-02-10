import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cinema() {
  const [cinemaList, setCinemaList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [currentCinema, setCurrentCinema] = useState({
    id: null,
  });
  console.log('roomList', roomList);
  const getCinemas = async () => {
    const result = await request.getCinemas();
    setCinemaList(result.data);
    setCurrentCinema(result.data[0]);
  };
  const getRoomList = async cinemaId => {
    const result = await request.getRoomsByCinemaId(cinemaId);
    setRoomList(result.data);
  };

  const handleDelete = async () => {
    const result = await request.deleteCinema(currentCinema.id);
    const response = result.data;

    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      getCinemas();
    }
  };

  const handleAddRoom = async e => {
    e.preventDefault();
    if (!roomName.length > 0) {
      toast.error('Tên phòng không được bỏ trống', {
        autoClose: 2000,
      });
      return;
    }
    const result = await request.addRoom(roomName, currentCinema.id);
    const response = result.data;

    if (response.success) {
      setRoomName('');
      getRoomList(currentCinema.id);
      toast.success(response.data.message, {
        autoClose: 2000,
      });
    } else {
      toast.error(response.data.message, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getCinemas();
  }, []);

  useEffect(() => {
    getRoomList(currentCinema.id);
  }, [currentCinema.id]);
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
                  <li className='breadcrumb-item active'>Danh sách rạp phim</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className='content'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-3 list-group cinema-list'>
                {cinemaList.map(cinema => {
                  return (
                    <Link
                      to='#'
                      key={cinema.id}
                      onClick={() => setCurrentCinema(cinema)}
                      className='list-group-item'
                    >
                      {cinema.name}
                    </Link>
                  );
                })}
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
                          {/* dấu x */}
                          <span aria-hidden='true'>×</span>
                        </button>
                      </div>
                      <div className='modal-body'>Bạn muốn xóa rạp này?</div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Đóng
                        </button>
                        <Link
                          to='#'
                          id='cinema-delete-confirm'
                          role='button'
                          className='btn btn-danger text-white'
                          onClick={handleDelete}
                          data-dismiss='modal'
                        >
                          Xóa
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <c:foreach var="cinema" items="${cinemas}"> */}
                <div className='info-cinema' id='info-cinema-${cinema.id}'>
                  <div className='row'>
                    <div className='col-sm-4'>
                      <h2>Danh sách phòng</h2>
                      <ul className='list-group'>
                        {/* <c:foreach var="room" items="${cinema.rooms}"> */}
                        {roomList.map(room => {
                          return (
                            <li key={room.id} className='list-group-item'>
                              {room.name}
                            </li>
                          );
                        })}
                        {/* </c:foreach> */}
                      </ul>
                      <br />
                      Thêm phòng
                      <form
                        action='/admin/rooms'
                        method='post'
                        onSubmit={handleAddRoom}
                      >
                        {/* <input
                          name='cinemaId'
                          defaultValue='${cinema.id}'
                          hidden
                        /> */}
                        <input
                          className='form-control mb-2'
                          placeholder='Tên'
                          type='text'
                          name='name'
                          required
                          value={roomName}
                          onChange={e => setRoomName(e.target.value)}
                        />
                        <button className='btn btn-primary' type='submit'>
                          Thêm
                        </button>
                      </form>
                    </div>
                    <div className='col-sm-8'>
                      <div id='detail-cinema-${cinema.id}'>
                        <h2>{currentCinema?.name}</h2>
                        <br />
                        <label>Thuộc thành phố:</label> {currentCinema?.city}
                        <br />
                        <br />
                        <Link
                          to={`/admin/cinemas/${currentCinema?.id}`}
                          role='button'
                          className='btn-update-cinema btn btn-primary mr-2'
                        >
                          Cập nhật
                        </Link>
                        <button
                          data-toggle='modal'
                          data-target='#exampleModal'
                          className='btn btn-danger'
                          //   data-cinema-id='${cinema.id}'
                          type='button'
                        >
                          Xóa
                        </button>{' '}
                        {/* data-target="#exampleModal"  */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </c:foreach> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cinema;
