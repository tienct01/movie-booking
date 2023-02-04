import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import request from '../api/request';
import jwtDecode from 'jwt-decode';
import { clearError, loginAsync } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../utils/regex';
function Login() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    if (auth.currentUser) {
      navigate('/');
    }
  });
  useEffect(() => {
    if (auth?.error) {
      toast.error(auth.error.message, {
        autoClose: 2000,
      });
      dispatch(clearError())
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateEmail(userData.email)) {
      toast.error('Email không hợp lệ', {
        autoClose: 2000,
      });
      return;
    }
    if (validateEmail(userData.email) && !validatePassword(userData.password)) {
      toast.error('Mật khẩu gồm ít nhất 6 ký tự', {
        autoClose: 2000,
      });
      return;
    }

    dispatch(loginAsync(userData));
  };

  const handleChange = (name, value) => {
    const newUserData = { ...userData };
    newUserData[name] = value;
    setUserData(newUserData);
  };

  return (
    <div>
      <Navbar />
      <form
        id='login-form'
        className='login'
        method='post'
        action='/login'
        onSubmit={handleSubmit}
      >
        <p className='login__title'>
          ĐĂNG NHẬP
          <br />
          <span className='login-edition'>Chào mừng bạn đến CGV Cinema</span>
        </p>

        <div className='social social--colored'>
          <Link to='#' className='social__variant fa fa-facebook'></Link>
          <Link to='#' className='social__variant fa fa-twitter'></Link>
          <Link to='#' className='social__variant fa fa-tumblr'></Link>
        </div>

        <p className='login__tracker'>or</p>

        <div className='field-wrap'>
          <input
            type='text'
            placeholder='Email'
            name='email'
            className='login__input'
            value={userData.email}
            onChange={e => handleChange('email', e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            className='login__input'
            value={userData.password}
            onChange={e => handleChange('password', e.target.value)}
          />
          {/* <!-- <p className="mycolor">${message}</p> --> */}
        </div>

        <div className='login__control'>
          <button type='submit' className='btn btn-md btn--warning btn--wider'>
            Đăng nhập
          </button>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Login;
