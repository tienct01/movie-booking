import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../api/request';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {validateEmail,validatePassword} from '../utils/regex'
function Register() {
    const navigate=useNavigate();
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    passConfirm: '',
    address: '',
    dob: '',
  });
  console.log('data',data)
  const handleChange = (name, value) => {
    const newData = { ...data };
    newData[name] = value;
    setData(newData);
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validateEmail(data.email))
    {
        toast.error('Email không hợp lệ', {
            autoClose: 2000,
          });
          return;
    }
    if(!validatePassword(data.password))
    {
        toast.error('Mật khẩu phải gồm ít nhất 6 ký tự', {
            autoClose: 2000,
          });
          return;
    }
    if(data.password!==data.passConfirm)
    {
        toast.error('Mật khẩu không trùng khớp', {
            autoClose: 2000,
          });
          return;
    }
    const result=await request.register(data);
    const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          navigate('/login');    
      }
      else{
        toast.error(response.data.message, {
            autoClose: 2000,
          });
      }
  }
  return (
    <div>
      <Navbar />
      <div className='content'>
        <div className='container-fluid' style={{ minHeight: '550px' }}>
          <h1
            className='text-center'
            style={{ marginTop: '20px', marginLeft: '70px', color: '#000000' }}
          >
            ĐĂNG KÝ
          </h1>
          <br />
          <div className='row'>
            <div className='col-xs-12 col-sm-10 col-md-5 well well-sm col-md-offset-4'>
              <legend>Đăng ký thành viên!</legend>
              <form
                action='/register'
                method='post'
                className='form'
                role='form'
                id='form-register'
                onSubmit={handleSubmit}
              >
                <input
                  className='form-control'
                  name='fullName'
                  placeholder='Full Name'
                  required
                  value={data.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                />
                <br />
                <input
                  className='form-control'
                  name='email'
                  placeholder='Email'
                  type='email'
                  required
                  value={data.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                <br />
                <input
                  className='form-control'
                  id='password'
                  name='password'
                  placeholder='Mật khẩu'
                  type='password'
                  required
                  value={data.password}
                  onChange={e => handleChange('password', e.target.value)}
                />
                <br />
                <input
                  className='form-control'
                  id='re-password'
                  name='re-password'
                  placeholder='Nhập lại mật khẩu'
                  type='password'
                  required
                  value={data.passConfirm}
                  onChange={e => handleChange('passConfirm', e.target.value)}
                />
                <br />
                <input
                  className='form-control'
                  name='zone'
                  placeholder='Địa chỉ'
                  type='text'
                  required
                  value={data.address}
                  onChange={e => handleChange('address', e.target.value)}
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
                      value={data.dob}
                      onChange={e => handleChange('dob', e.target.value)}
                    />

                    <br />
                  </div>
                </div>

                <button
                  id='btn-register'
                  className='btn btn-lg btn-primary btn-block'
                  type='submit'
                  style={{ letterSpacing: '7px' }}
                >
                  {' '}
                  ĐĂNG KÝ
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
