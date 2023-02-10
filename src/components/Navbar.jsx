import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import request from '../api/request';
import { getMeAsync, logout } from '../redux/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(getMeAsync());
      console.log('call api');
    }
  }, [dispatch]);

  return (
    <header className='header-wrapper'>
      <div className='container'>
        <Link to='/' className='logo'>
          <img
            alt='logo'
            width='100'
            height='100'
            src='/static/images/imager_2_14521_700.jpg'
          />
        </Link>

        <nav id='navigation-box'>
          <Link to='#' id='navigation-toggle'>
            <span className='menu-icon'>
              <span
                className='icon-toggle'
                role='button'
                aria-label='Toggle Navigation'
              >
                <span className='lines'></span>
              </span>
            </span>
          </Link>

          <ul id='navigation'>
            <li>
              <span className='sub-nav-toggle plus'></span>
              <Link to='/amount'>Trang giá</Link>
            </li>
            {/* <li>
              <span className='sub-nav-toggle plus'></span>
              <Link to='/admin'>Quản lý</Link>
            </li> */}
            {currentUser?.role === 'ADMIN' && (
              <li>
                <span className='sub-nav-toggle plus'></span>
                <a href='/admin/movies'>Quản lý</a>
              </li>
            )}
            {currentUser && (
              <li>
                <span className='sub-nav-toggle plus'></span>
                <Link to='/information'>Cá nhân</Link>
              </li>
            )}
            {currentUser?.role === 'USER' && (
              <li>
                <span className='sub-nav-toggle plus'></span>
                <Link to='/history'>Lịch sử</Link>
              </li>
            )}
            {currentUser?.role === 'EMP' && (
              <li>
                <span className='sub-nav-toggle plus'></span>
                <Link to='/tickets'>In vé</Link>
              </li>
            )}
          </ul>
        </nav>
        {currentUser ? (
          <div className='control-panel'>
            <Link
              to='#'
              className='btn btn--sign'
              onClick={() => dispatch(logout())}
            >
              Đăng xuất
            </Link>
          </div>
        ) : (
          <>
            <div className='control-panel'>
              <Link to='/login' className='btn btn--sign'>
                Đăng nhập
              </Link>
            </div>
            <div className='control-panel' style={{
                right:'150px'
            }}>
              <Link to='/register' className='btn btn--sign'>
                Đăng ký
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
