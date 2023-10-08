import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function BookingChair() {
  const params = useParams();
  const navigate = useNavigate();
  const { scheduleId } = params;
  const [chairs, setChairs] = useState([]);
  const [chairBook, setChairBook] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  console.log('selectedChairs', selectedChairs);
  const [amount, setAmount] = useState([]);
  const [totalMoney, setTotalMoney] = useState([0]);
  console.log('totalMoney', totalMoney);

  const getChairs = async scheduleId => {
    const resultChairBook = await request.getChairsByScheduleId(scheduleId);
    setChairBook(resultChairBook.data);
  };
  const getAllChairs = async () => {
    const resultChair = await request.getAllChairs();
    setChairs(resultChair.data);
  };

  const handleChair = chairId => {
    if (selectedChairs.includes(chairId)) {
      const newChairs = selectedChairs.filter(c => c !== chairId);
      setSelectedChairs(newChairs);
      return;
    }
    const newChairs = [...selectedChairs, chairId];
    setSelectedChairs(newChairs);
  };

  const getTimeTypeSchedule = async scheduleId => {
    const resultTime = await request.getTimeTypeSchedule(scheduleId);
    const { date_type, time_type, format_id } = resultTime.data[0];
    const resultAmount = await request.getAmount({
      date_type,
      time_type,
      format_id,
    });
    const { amount, amount_vip } = resultAmount.data[0];
    setAmount([amount, amount_vip]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('selectedChairs', selectedChairs);
    const result = await request.bookingChairs({
      scheduleId,
      selectedChairs,
      totalMoney,
    });
    const response = result.data;
    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  useEffect(() => {
    const money = selectedChairs
      .map(s => {
        const status = chairs.find(c => c.id === s).status;
        return amount[status];
      })
      .reduce((a, b) => a + b, 0);
    setTotalMoney(money);
  }, [selectedChairs]);

  useEffect(() => {
    getChairs(scheduleId);
    getAllChairs();
    getTimeTypeSchedule(scheduleId);
  }, [scheduleId]);
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='chair-container' id='chair'>
          <div className='info-chair-room'>
            {' '}
            <h1 style={{ letterSpacing: '3px' }}>CHỌN GHẾ</h1>
            <div
              style={{
                width: '500px',
                margin: '0 auto 20px',
                backgroundColor: '#337ab7',
                height: '50px',
                lineHeight: '50px',
                textAlign: 'center',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              MÀN HÌNH
            </div>
            <div
              style={{
                width: '600px',
                margin: '0 auto',
              }}
            >
              {chairs.map(chair => {
                return (
                  <a
                    onClick={() => handleChair(chair.id)}
                    style={{
                      display: 'inline-block',
                      width: '7%',
                      margin: '5px',
                    }}
                    key={chair.id}
                    href='#'
                    disabled={chairBook.map(c => c.chair_id).includes(chair.id)}
                    className={`btn info-room-chair ${
                      chairBook.map(c => c.chair_id).includes(chair.id)
                        ? 'btn-warning'
                        : selectedChairs.includes(chair.id)
                        ? 'btn-danger'
                        : chair.yPosition === 4 || chair.yPosition === 5
                        ? 'btn-success'
                        : 'btn-primary'
                    }`}
                  >
                    {chair.xPosition}
                    {chair.yPosition}
                  </a>
                );
              })}
            </div>
          </div>
          {selectedChairs.length > 0 && (
            <div
              style={{
                padding: '10px 20px',
                width: 'fit-content',
                margin: '20px auto 20px',
                backgroundColor: '#337ab7',
                textAlign: 'center',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              {totalMoney.toLocaleString()} VND
            </div>
          )}

          <br />
          <div className='col-sm-12'>
            <label>Chú thích: </label>
            <br />
            <button disabled className='btn btn-primary note' /> Ghế thường
            <button disabled className='btn btn-success note' /> Ghế vip
            <button disabled className='btn btn-danger note' /> Ghế đang chọn
            <button disabled className='btn btn-warning note' /> Ghế đã đặt
          </div>
          <div className='col-sm-12'>
            {selectedChairs.length > 0 && (
              <button
                type='button'
                className='btn btn-info'
                style={{
                  margin: '20px 0',
                }}
                data-toggle='modal'
                data-target='#myModal'
              >
                Thanh toán
              </button>
            )}

            <div id='myModal' className='modal fade' role='dialog'>
              <div className='modal-dialog'>
                {/* Modal content*/}
                <div className='modal-content'>
                  <div className='modal-header'>
                    <button
                      type='button'
                      className='close'
                      data-dismiss='modal'
                    >
                      ×
                    </button>
                    <h4 className='modal-title'>Thanh toán</h4>
                  </div>
                  <div className='modal-body'>
                    <form
                      action='#'
                      method='get'
                      id='form-checkout'
                      onSubmit={handleSubmit}
                    >
                      {/* khi không gửi data từ form đến trang nào thì action # */}
                      <div className='row'>
                        <div className='form-group col-sm-6'>
                          <label htmlFor='sel1'>Chọn loại ngân hàng:</label>
                          <select className='form-control' id='sel1'>
                            <option>Visa</option>
                            <option>Vietcombank</option>
                            <option>VPbank</option>
                            <option>Viettinbank</option>
                          </select>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='card-number'>Số thẻ:</label>
                            <input
                              type='number'
                              className='form-control'
                              id='card-number'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='date'>Ngày hết hạn:</label>
                            <input
                              type='date'
                              className='form-control'
                              id='date'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <h2>Thông tin</h2>
                      <div className='row'>
                        <div className='col-sm-3'>
                          <div className='form-group'>
                            <label htmlFor='last-name'>Họ</label>
                            <input
                              type='text'
                              className='form-control'
                              id='last-name'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-3'>
                          <div className='form-group'>
                            <label htmlFor='first-name'>Tên:</label>
                            <input
                              type='text'
                              className='form-control'
                              id='first-name'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='city'>Thành phố:</label>
                            <input
                              type='text'
                              className='form-control'
                              id='city'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='address'>Địa chỉ:</label>
                            <input
                              type='text'
                              className='form-control'
                              id='address'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='zip-code'>Mã zip:</label>
                            <input
                              type='number'
                              className='form-control'
                              id='zip-code'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='country'>Quốc gia:</label>
                            <input
                              type='text'
                              className='form-control'
                              id='country'
                              required
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label htmlFor='phone'>Số điện thoại:</label>
                            <input
                              type='number'
                              className='form-control'
                              id='phone'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <button type='submit' className='btn btn-primary'>
                        Gửi
                      </button>
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button
                      id='btn-close'
                      type='button'
                      className='btn btn-default'
                      data-dismiss='modal'
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookingChair;
