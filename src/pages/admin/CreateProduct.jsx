import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import FileBase64 from 'react-file-base64';

function CreateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const { productId } = params;
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    image:'',
  });

  const handleChange = (name, value) => {
    const newProductData = { ...productData };
    newProductData[name] = value;
    setProductData(newProductData);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('productData', productData);
    if (!productData.name.length > 0) {
      toast.error('Họ tên không được bỏ trống', {
        autoClose: 2000,
      });
      return;
    }
    
    if (!productData.price > 0) {
      toast.error('Giá phải lớn hơn 0', {
        autoClose: 2000,
      });
      return;
    }
    if (productId) {
      const newProductData = { id: productId, ...productData };
      const result = await request.updateProduct(newProductData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/products');
      }
      console.log('update', result);
    } else {
      const result = await request.createProduct(productData);
      const response = result.data;
      if (response.success) {
        toast.success(response.data.message, {
          autoClose: 2000,
        });
        navigate('/admin/products');
      } else {
        toast.error(response.data.message, {
          autoClose: 2000,
        });
      }
      console.log('create', result);
    }
  };

  const getProductInfo = async productId => {
    const resultProduct = await request.getProductById(productId);
    const { name,price,image} = resultProduct.data[0];
    setProductData({
      name,price,image
    });
  };

  useEffect(() => {
    if (productId) {
      getProductInfo(productId);
    }
  }, [productId]);
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
                  <li className='breadcrumb-item active'>Thêm mới sản phẩm</li>
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
                  <label>Tên sản phẩm</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    id='fullName'
                    type='text'
                    className='form-control'
                    path='fullName'
                    value={productData.fullName}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                </div>
              </div>

              {/* <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Email</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    id='email'
                    type='email'
                    className='form-control'
                    path='email'
                    disabled={productId ? true : false}
                    value={productData.email}
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
                    value={productData.password}
                    onChange={e => handleChange('password', e.target.value)}
                  />
                </div>
              </div> */}
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <label>Giá bán</label>
                </div>
                <div className='col-sm-4'>
                  <input
                    id=''
                    type='text'
                    className='form-control'
                    path='address'
                    value={productData.price}
                    onChange={e => handleChange('price', e.target.value)}
                  />
                </div>
              </div>
              <div className='row' style={{ marginBottom: '15px' }}>
                <div className='col-sm-2' style={{ marginLeft: '150px' }}>
                  <labe>Hình ảnh</labe>
                </div>
                <div className='col-sm-4'>
                  <FileBase64
                    multiple={false}
                    onDone={({ base64 }) => {
                      setProductData({ ...productData, image: base64 });
                    }}
                  />
                  {/* <input
                    type='file'
                    className='form-control-file'
                    name='image'
                    // value={movieData.image}
                    onChange={e => handleChange('image', e.target.files[0])}
                  /> */}
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
                    {productId ? 'Cập nhật' : 'Thêm'}
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

export default CreateProduct;
