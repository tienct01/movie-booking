import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeAsync, logout } from '../../redux/authSlice';

function Nav() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(getMeAsync());
    }
    
  }, [dispatch]);

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const timeExp = jwtDecode(accessToken).exp * 1000;
      if (!timeExp || timeExp < new Date().getTime()) {
        localStorage.removeItem('accessToken');
        navigate('/login');
        window.location.reload();
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      navigate('/login');
      window.location.reload();
    }
  });

  return (
    <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
      {/* Left navbar links */}
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            data-widget='pushmenu'
            to='#'
            role='button'
          >
            <i className='fas fa-bars' />
          </Link>
        </li>
        {/* <li class="nav-item d-none d-sm-inline-block">
        <Link to="/admin" class="nav-link">Quản lý</Link>
    </li> */}
        <li className='nav-item d-none d-sm-inline-block'>
          <a href='/amount' className='nav-link'>
            Trang giá
          </a>
        </li>
        <li className='nav-item d-none d-sm-inline-block'>
          <a href='/information' className='nav-link'>
            Cá nhân
          </a>
        </li>
        <li className='nav-item d-none d-sm-inline-block'>
          <Link to='#' onClick={() => dispatch(logout())} className='nav-link'>
            Đăng xuất
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
