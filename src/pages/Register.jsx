import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Register() {
  return (
    <div>
      <Navbar />
      <div className='content'>
        <div className='container-fluid' style={{ minHeight: '550px' }}>
          <h1
            className='text-center'
            style={{ marginTop: '20px', marginLeft: '70px', color: '#000000' }}
          >
            ĐĂNG KÍ
          </h1>
          <br />
          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-md-5 well well-sm col-md-offset-4'>
              <legend>
                <a href /> Đăng ký thành viên!
              </legend>
              <form
                action='/register'
                method='post'
                className='form'
                role='form'
                id='form-register'
              >
                <div className='row'>
                  <div className='col-xs-6 col-md-6'>
                    <input
                      className='form-control'
                      name='username'
                      placeholder='User Name'
                      required
                      autofocus
                      type='text'
                      id='user'
                    />
                    <br />
                  </div>
                  <div className='col-xs-6 col-md-6'>
                    <input
                      className='form-control'
                      name='fullname'
                      placeholder='Full Name'
                      required
                      type='text'
                    />
                  </div>
                </div>
                <input
                  className='form-control'
                  name='email'
                  placeholder='Email'
                  type='email'
                  required
                />
                <br />
                <input
                  className='form-control'
                  name='phone'
                  placeholder='Số điện thoại'
                  type='number'
                  required
                />
                <br />
                <input
                  className='form-control'
                  id='password'
                  name='password'
                  placeholder='Mật khẩu'
                  type='password'
                  required
                />
                <br />
                <input
                  className='form-control'
                  id='re-password'
                  name='re-password'
                  placeholder='Nhập lại mật khẩu'
                  type='password'
                  required
                />
                <br />
                <input
                  className='form-control'
                  name='cinemaLove'
                  placeholder='Rạp yêu thích'
                  type='text'
                  required
                />
                <br />
                <input
                  className='form-control'
                  name='zone'
                  placeholder='Khu vực'
                  type='text'
                  required
                />
                <br />
                <label htmlFor='date-of-birth'> Ngày sinh</label>
                <div className='row'>
                  <div className='col-xs-6 col-md-12'>
                    <input
                      type='date'
                      id='date-of-birth'
                      name='dateOfBirth'
                      className='form-control'
                      required
                    />
                    <br />
                  </div>
                </div>
                <label htmlFor>Giới tính</label>
                <br />
                <div className='row'>
                  <label>
                    <input
                      name='gender'
                      id='inlineCheckbox1'
                      type='radio'
                      defaultValue='true'
                    />{' '}
                    Nam
                  </label>
                  <label>
                    <input
                      name='gender'
                      id='inlineCheckbox2'
                      type='radio'
                      defaultValue='false'
                    />{' '}
                    Nữ
                  </label>
                </div>
                <p className='mycolor'>
                  ${'{'}message{'}'}
                </p>
                <button
                  id='btn-register'
                  className='btn btn-lg btn-primary btn-block'
                  type='submit'
                  style={{ letterSpacing: '7px' }}
                >
                  {' '}
                  ĐĂNG KÍ
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
