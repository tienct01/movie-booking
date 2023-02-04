import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../static/css/information.css';
import request from '../api/request';
function Information() {
  const [myInfo, setMyInfo] = useState();
  const getMyInformation = async () => {
    const result = await request.getMyInfo();
    setMyInfo(result.data[0]);
  };
  useEffect(() => {
    getMyInformation();
  }, []);
  return (
    <div>
      <Navbar />
      {myInfo && (
        <div className='container'>
          <div id='alert' className='alert alert-warning hidden'>
            <strong>Warning!</strong> Không thể cập nhật thông tin cá nhân.
          </div>
          <h3>Ảnh đại diện</h3>
          <div className='avatar-container'>
            <div>
              <img
                src={myInfo.avatar || '/static/images/default-avatar.png'}
                alt='Avatar'
                className='avatar'
              />
            </div>
          </div>
          <div className='details-container'>
            <h3>Thông tin tài khoản</h3>
            <div className='row'>
              <div className='col-sm-3'>
                <ul>
                  <li>
                    <b>Họ và tên:</b>
                  </li>
                  <li>
                    <b>Email:</b>
                  </li>
                  <li>
                    <b>Ngày sinh:</b>
                  </li>
                  <li>
                    <b>Giới tính</b>
                  </li>
                  <li>
                    <b>Địa chỉ:</b>
                  </li>
                </ul>
              </div>
              <div className='col-sm-5'>
                <ul>
                  <li>{myInfo.fullName}</li>
                  <li>{myInfo.email}</li>
                  <li>{myInfo.dateOfBirth || 'Chưa có'}</li>
                  <li>{myInfo.gender === 1 ? 'Nam' : 'Nữ'}</li>
                  <li>{myInfo.phone}</li>
                  <li>{myInfo.address}</li>
                </ul>
              </div>
            </div>
            <button
              type='button'
              className='btn btn-primary'
              id='edit-information'
            >
              Sửa thông tin
            </button>
          </div>
          <div className='update-information hidden'>
            <h3>Cập nhật tài khoản</h3>
            <form method='post' action='/information'>
              <div className='row'>
                <div className='col-sm-3'>
                  <ul>
                    <li>
                      <label>Họ và tên:</label>
                    </li>
                    <li>
                      <label>Tên đăng nhập:</label>
                    </li>
                    <li>
                      <label>Email:</label>
                    </li>
                    <li>
                      <label>Số điện thoại:</label>
                    </li>
                    <li>
                      <label>Ngày sinh:</label>
                    </li>
                    <li>
                      <label>Giới tính</label>
                    </li>
                    <li>
                      <label>Khu vực</label>
                    </li>
                    <li>
                      <label>Rạp yêu thích</label>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <ul>
                    <li>
                      <input
                        type='text'
                        defaultValue='${myInfo.fullName}'
                        name='fullName'
                        required
                      />
                    </li>
                    <li>
                      <input
                        type='text'
                        defaultValue='${myInfo.username}'
                        name='username'
                        readOnly
                      />
                    </li>
                    <li>
                      <input
                        type='email'
                        defaultValue='${myInfo.email}'
                        name='email'
                        required
                      />
                    </li>
                    <li>
                      <input
                        type='number'
                        defaultValue='${myInfo.phone}'
                        name='phone'
                        required
                      />
                    </li>
                    <li>
                      <input
                        type='date'
                        defaultValue='${myInfo.dateOfBirth}'
                        name='dateOfBirth'
                        required
                      />
                    </li>
                    <li>
                      <select name='gender'>
                        <option value='true'>Nam</option>
                        <option value='false'>Nữ</option>
                      </select>
                    </li>
                    <li>
                      <input
                        type='text'
                        defaultValue='${myInfo.zone}'
                        name='zone'
                        required
                      />
                    </li>
                    <li>
                      <input
                        type='text'
                        defaultValue='${myInfo.cinemaLove}'
                        name='cinemaLove'
                        required
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                id='update-information'
              >
                Cập nhật thông tin
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Information;
