import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import { validateEmail, validatePassword } from '../../utils/regex';

function CreateEmployee() {
  const navigate = useNavigate();
  const params = useParams();
  const { empId } = params;
  const [empData, setEmpData] = useState({
    fullName: '',
    address: '',
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    const newEmpData = { ...empData };
    newEmpData[name] = value;
    setEmpData(newEmpData);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('empData', empData);
    if (!empData.fullName.length > 0) {
      toast.error('Họ tên không được bỏ trống', {
        autoClose: 2000,
      });
      return;
    }
    if (!validateEmail(empData.email)) {
      toast.error('Email không hợp lệ', {
        autoClose: 2000,
      });
      return;
    }
    if (!validatePassword(empData.password)) {
      toast.error('Mật khẩu phải gồm ít nhất 6 kí tự', {
        autoClose: 2000,
      });
      return;
    }
    if (!empData.address.length > 0) {
      toast.error('Địa chỉ không được bỏ trống', {
        autoClose: 2000,
      });
      return;
    }
    if (empId) {
      const newEmpData = { id: empId, ...empData };
      const result = await request.updateEmp(newEmpData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/employees');
      }
      console.log('update', result);
    } else {
      const result = await request.createEmp(empData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/employees');
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      }
      console.log('create', result);
    }
  };

  const getEmpInfo = async empId => {
    const resultEmp = await request.getEmpById(empId);
    const { fullName, address, email, password } = resultEmp.data[0];
    setEmpData({
      fullName,
      address,
      email,
      password,
    });
  };

  useEffect(() => {
    if (empId) {
      getEmpInfo(empId);
    }
  }, [empId]);
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
                  <li className='breadcrumb-item active'>Thêm mới nhân viên</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
            <div
              id='user-alert'
              className='alert alert-warning alert-dismissible hidden'
            >
              <a
                href='#'
                className='close'
                data-dismiss='alert'
                aria-label='close'
              >
                ×
              </a>
              <strong>Thất bại!</strong> Tên đăng nhập hoặc email đã được sử
              dụng.
            </div>
            {/* <%--@elvariable id="user" type="com.project.movietickets.entity.UserEntity" --%> */}
            <form
              id='form'
              action='/admin/employees/create'
              method='post'
              modelattribute='user'
              onSubmit={handleSubmit}
            >
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Họ tên</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    id='fullName'
                    type='text'
                    className='form-control'
                    path='fullName'
                    value={empData.fullName}
                    onChange={e => handleChange('fullName', e.target.value)}
                  />
                </div>
              </div>

              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Email</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    id='email'
                    type='email'
                    className='form-control'
                    path='email'
                    disabled={empId ? true : false}
                    value={empData.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Mật khẩu</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    type='password'
                    id='forget-password'
                    className='form-control'
                    path='password'
                    value={empData.password}
                    onChange={e => handleChange('password', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Địa chỉ</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    id=''
                    type='text'
                    className='form-control'
                    path='address'
                    value={empData.address}
                    onChange={e => handleChange('address', e.target.value)}
                  />
                </div>
              </div>
              {/* <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Chức vụ</label>
                </div>
                <div className='col-sm-4'>
                  <select path='role' className='form-control'>
                    <option value='ROLE_EMPLOYEE'>Nhân viên</option>
                    <option value='ROLE_ADMIN'>Admin</option>
                  </select>
                </div>
              </div> */}
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}></div>
                <div className='col-sm-4'>
                  <button
                    id='btn-submit'
                    type='submit'
                    className='btn btn-primary'
                  >
                    {empId ? 'Cập nhật' : 'Thêm'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Content */}
          {/* End Content */}
        </section>
      </div>
    </div>
  );
}

export default CreateEmployee;
