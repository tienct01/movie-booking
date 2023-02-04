import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';

function Employee() {
  const [empList, setEmpList] = useState([]);
  const [currentEmp,setCurrentEmp]=useState({
    id:null
  })
  console.log('empList', empList);
  const getEmpList = async () => {
    const result = await request.getEmpList();
    setEmpList(result.data);
  };
const handleDelete=async (empId)=>{
    const result=await request.deleteEmp(empId);
    const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          getEmpList();   
      }
}

  useEffect(() => {
    getEmpList();
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
                    Danh sách nhân viên
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container'>
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
                  <div className='modal-body'>Bạn muốn xóa nhân viên này?</div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Đóng
                    </button>
                    <Link
                      id='employee-delete-confirm'
                      role='button'
                      className='btn btn-danger text-white'
                      to='#'
                      data-dismiss='modal'
                      onClick={()=>handleDelete(currentEmp.id)}
                    >
                      Xóa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <p>Danh sách các nhân viên:</p>
            {/* <c:foreach var="employee" items="${employees}"> */}
            {/* </c:foreach> */}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Tên nhân viên</th>
                  <th>Chức vụ</th>
                  <th>Email</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {empList.map(emp => {
                  return (
                    <tr>
                      <td>{emp.fullName}</td>
                      <td>
                        <span className='badge badge-primary'>{emp.role==='EMP'?'Nhân viên':'Quản lý'}</span>
                      </td>
                      <td>{emp.email}</td>
                      <td>
                        <Link
                          role='button'
                          className='btn-primary btn mr-2'
                          to={`/admin/employees/${emp.id}`}
                        >
                          Sửa
                        </Link>
                        <button
                          data-toggle='modal'
                          data-target='#exampleModal'
                        //   data-employee-id='${employee.id}'
                          className='btn btn-danger delete-employee-action'
                          onClick={()=>setCurrentEmp(emp)}
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

export default Employee;
