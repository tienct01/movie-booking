import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Menu() {
  const { currentUser } = useSelector(state => state.auth);
  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      {/* Brand Logo */}
      <Link to='#' className='brand-link'>
        <img
          src='/static/dist/img/AdminLTELogo.png'
          alt='AdminLTE Logo'
          className='brand-image img-circle elevation-3'
          style={{ opacity: '.8' }}
        />
        <span className='brand-text font-weight-light'>Dashboard</span>
      </Link>
      {/* Sidebar */}
      <div className='sidebar'>
        {/* Sidebar user panel (optional) */}
        <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div className='image'>
            <img
              src={
                currentUser?.avatar
                  ? currentUser?.avatar
                  : '/static/images/avatar.png'
              }
              className='img-circle elevation-2'
              alt='User'
              style={{ opacity: '.8', width: '40px', height: '40px' }}
            />
          </div>
          <div className='info'>
            {' '}
            {/* in ra chu admin theo remote user */}
            <Link to='#' className='d-block'>
              {currentUser?.fullName}
            </Link>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}
            <li className='nav-item has-treeview' id='menu-movie'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Quản lý phim
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>{' '}
              {/* trong 1 <li> co a va ul */}
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/movies' className='nav-link '>
                    <i className='far fa-circle nav-icon' />
                    <p>Danh sách các bộ phim</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/movies/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Thêm mới bộ phim</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-cinema'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Quản lý rạp chiếu phim
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/cinemas' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Danh sách rạp phim</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/cinemas/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Thêm mới rạp phim</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-schedule'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Quản lý lịch chiếu phim
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/schedules' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Danh sách lịch chiếu</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/schedules/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Thêm mới lịch chiếu</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-report'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Báo cáo chi tiết
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/reports' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Báo cáo doanh thu</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-employee'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Quản lý nhân viên
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/employees' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Danh sách nhân viên</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/employees/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Thêm mới nhân viên</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item has-treeview' id='menu-movie'>
              <Link to='#' className='nav-link active'>
                <i className='nav-icon fas fa-tachometer-alt' />
                <p>
                  Quản lý sản phẩm
                  <i className='right fas fa-angle-left' />
                </p>
              </Link>{' '}
              {/* trong 1 <li> co a va ul */}
              <ul className='nav nav-treeview'>
                <li className='nav-item'>
                  <Link to='/admin/products' className='nav-link '>
                    <i className='far fa-circle nav-icon' />
                    <p>Danh sách các sản phẩm</p>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/products/create' className='nav-link'>
                    <i className='far fa-circle nav-icon' />
                    <p>Thêm mới sản phẩm</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}

export default Menu;
