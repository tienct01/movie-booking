import React, { useEffect, useState } from 'react';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import request from '../../api/request';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
function Product() {
    const navigate=useNavigate();
  const [productList, setProductList] = useState([]);
  console.log(productList);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
  });
  // const [currentCategories, setCurrentCategories] = useState([]);
  const handleDelete = async () => {
    const result = await request.deleteProduct(currentProduct.id);
    const response=result.data
      if(response.success)
      {
        toast.success(response.data.message, {
            autoClose: 2000,
          });
          getProducts();
      }
      
  };

  // console.log('currentCategories', currentCategories);
  const getProducts = async () => {
    const result = await request.getProducts();
    setProductList(result.data);
    setCurrentProduct(result.data[0]);
  };
  // const getCategories = async movieId => {
  //   const result = await request.getCategoriesByProductId(movieId);
  //   setCurrentCategories(result.data);
  // };

  useEffect(() => {
    getProducts();
  }, []);

  // useEffect(() => {
  //   if (currentProduct?.id) {
  //     getCategories(currentProduct?.id);
  //   }
  // }, [currentProduct?.id]);

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
                    Danh sách các sản phẩm
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
            <div className='row'>
              <div className='col-sm-3'>
                <div className='list-group movie-list'>
                  {productList.map(product => {
                    return (
                      <Link
                        to='#'
                        key={product.id}
                        onClick={() => setCurrentProduct(product)}
                        className='list-group-item'
                      >
                        {product.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className='col-sm-9'>
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
                      <div className='modal-body'>
                        Bạn muốn xóa sản phẩm này?
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Đóng
                        </button>
                        <button
                          type='button'
                          className='btn btn-danger'
                          data-dismiss='modal'
                          onClick={handleDelete}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <c:foreach var='movie' items='${movies}'> */}
                {currentProduct && (
                  <div className='info-movie' id='info-movie-${movie.id}'>
                    <div
                      id='detail-movie-${movie.id}'
                      style={{ marginLeft: '150px' }}
                    >
                      {/* <h2>{currentProduct.name}</h2> */}
                      <br />
                      <img
                        width={120}
                        height={160}
                        src={currentProduct.image}
                        alt='movie'
                      />
                      <br />
                      <br />
                      <label>Giá bán:</label> {currentProduct.price}
                      <br />
                      <br />
                      {/* <label>Miêu tả:</label> {currentProduct.description}
                      <br />
                      <br /> */}
                      {/* <label>Thể loại:</label>{' '}
                      {currentCategories.map(c => c.name).join(', ')}
                      <br />
                      <br /> */}
                      {/* <label>Ra mắt:</label>{' '}
                      {moment(currentProduct.timeRelease).format('DD-MM-YYYY')}
                      <br />
                      <br />
                      <label>Thời gian:</label> {currentProduct.time}
                      <br />
                      <br />
                      <label>Ngôn ngữ:</label> {currentProduct.language}
                      <br />
                      <br />
                      <label>Định dạng:</label> {currentProduct.format}
                      <br />
                      <br />
                      <label>Độ tuổi:</label>{' '}
                      {currentProduct.ageLimit === 0 ? 13 : currentProduct.ageLimit}
                      <br />
                      <br /> */}
                      <Link to={`/admin/products/${currentProduct.id}`}>
                        <button
                          type='button'
                          className='btn btn-primary btn-update-movie'
                        >
                          Cập nhật
                        </button>
                      </Link>
                      <button
                        type='button'
                        data-toggle='modal'
                        data-target='#exampleModal'
                        data-movie-id='${movie.id}'
                        className='btn btn-danger movie-delete-action'
                      >
                        Xóa sản phẩm
                      </button>
                    </div>
                  </div>
                )}
                {/* </c:foreach> */}
              </div>
            </div>
            {/* End Content */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Product;
