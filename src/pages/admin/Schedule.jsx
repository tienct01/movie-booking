import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function Schedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({
    id: null,
  });
  console.log('scheduleList', scheduleList);
  const getScheduleList = async () => {
    const resultSchedule = await request.getSchedules();
    setScheduleList(resultSchedule.data);
    setCurrentSchedule(resultSchedule.data[0].id);
  };

  const handleDelete=async()=>{
    const result=await request.deleteSchedule(currentSchedule.id);
    const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          getScheduleList();
      }
  }
  useEffect(() => {
    getScheduleList();
  }, []);
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
                    Danh sách lịch chiếu
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
            {/* Modal */}
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
                  <div className='modal-body'>Bạn muốn xóa lịch chiếu này?</div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Đóng
                    </button>
                    <Link
                      id='schedule-delete-confirm'
                      role='button'
                      className='btn btn-danger text-white'
                      to='#'
                      onClick={handleDelete}
                    >
                      Xóa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <p>Danh sách lịch chiếu của toàn bộ hệ thống</p>
            {/* <c:foreach var="roomMovieSchedule" items="${roomMovieSchedules}"> */}
            {/* </c:foreach> */}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Thành phố</th>
                  <th>Tên rạp</th>
                  <th>Tên phòng</th>
                  <th>Tên phim</th>
                  <th>Thời gian</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {scheduleList.map(schedule => {
                  return (
                    <tr key={schedule.id}>
                      <td>
                        {schedule.city}
                      </td>
                      <td>
                        {schedule.cinema}
                      </td>
                      <td>
                        {schedule.room}
                      </td>
                      <td>
                        {schedule.movie}
                      </td>
                      <td>
                        {moment(schedule.premiere).format('HH:mm DD-MM-YYYY')}
                      </td>
                      <td>
                        <Link
                          role='button'
                          to={`/admin/schedules/${schedule.id}`}
                          className='btn btn-primary mr-2'
                        >
                          Cập nhật
                        </Link>
                        <button
                          type='button'
                          data-toggle='modal'
                          data-target='#exampleModal'
                        //   data-id='${roomMovieSchedule.id}'
                          className='btn btn-danger room-movie-schedule-delete-action'
                          onClick={()=>setCurrentSchedule(schedule)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Schedule;
