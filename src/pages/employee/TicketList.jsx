import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import request from '../../api/request';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function TicketList() {
  const [ticketInfo, setTicketInfo] = useState();
  const [code, setCode] = useState('');
  const [receive, setReceive] = useState(false);
  console.log('ticketInfo', ticketInfo );
  const handleSubmit = async e => {
    e.preventDefault();
    if (code.trim().length === 0) {
      toast.error('Nhập code để tìm kiếm', {
        autoClose: 2000,
      });
      return;
    }
    const result = await request.getTicketByCode(code);
    const response = result.data;
    if (response.length === 0) {
      setTicketInfo();
      return;
    }
    const ticket = response
      .map(l => {
        return {
          ...l,
          position: [l.xPosition + l.yPosition],
        };
      })
      .reduce((prev, cur) => {
        const {
          created_date,
          id,
          movie,
          cinema,
          premiere,
          room,
          value,
          code,
          status,
          fullName,
          movie_time,
        } = prev;
        return {
          created_date,
          id,
          movie,
          premiere,
          room,
          cinema,
          value,
          code,
          status,
          fullName,
          movie_time,
          position: [...prev.position, ...cur.position],
        };
      });
    setTicketInfo(ticket);
  };

  const handleReceive = async e => {
    e.preventDefault();
    const result = await request.receiveTicket(code);
    const response = result.data;
    if (response.success) {
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      setReceive(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='container' style={{ marginTop: '50px' }}>
        <div className='col-xs-12 col-sm-12 col-md-4 well well-sm col-md-offset-4'>
          <form onSubmit={handleSubmit}>
            <input
              className='my-0 py-1'
              placeholder='Search'
              name='code'
              type='text'
              id='code'
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button type='submit' className='btn-primary btn'>
              Tìm
            </button>
          </form>
        </div>
        {!receive ? (
          ticketInfo ? (
            <div className='col-xs-12 col-sm-12 col-md-4 well well-sm col-md-offset-4'>
              <h4 className='card-title'>{ticketInfo.movie.toUpperCase()}</h4>
              <span>Mã code: {ticketInfo.code.toUpperCase()}</span>
              <br />
              <span>
                Ngày đặt: {moment(ticketInfo.created_date).format('DD-MM-YYYY')}
              </span>
              <br />
              <span>
                Ngày chiếu:{' '}
                {moment(ticketInfo.premiere).format('HH:mm DD-MM-YYYY')}
              </span>
              <br />
              <span>Rạp: {ticketInfo.cinema}</span>
              <br />
              <span>Phòng: {ticketInfo.room}</span>
              <br />
              <span>Ghế: {ticketInfo.position.join(', ')}</span>
              <br />
              <span>
                Tình trạng:{' '}
                {ticketInfo.status === 1 ? 'Đã nhận vé!' : 'Chưa nhận vé!'}
              </span>
              <hr />
              {ticketInfo.status === 1 ? (
                <button disabled className='btn btn-primary' type='submit'>
                  Nhận vé
                </button>
              ) : (
                <form
                  method='post'
                  action='/manage/receive'
                  onSubmit={handleReceive}
                >
                  <input name='code' defaultValue='${ticketInfo.code}' hidden />
                  <button className='btn btn-primary' type='submit'>
                    Nhận vé
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className='col-xs-12 col-sm-12 col-md-4 well well-sm col-md-offset-4'>
              <hr />
              <h5>Không tìm thấy kết quả!</h5>
            </div>
          )
        ) : (
          <div className='col-xs-12 col-sm-12 col-md-6 well well-sm col-md-offset-3'>
            <div className='row'>
              {/* <div className='col-sm-2'>
                <h3>Số:01</h3>
              </div> */}
              <div className='col-sm-8'>
                <h1 style={{ textAlign: 'center' }}>VÉ XEM PHIM</h1>
              </div>
              <div className='col-sm-4'>
                <h1 style={{ color: 'red' }}>CGV</h1>
              </div>
            </div>
            <div className='row' style={{ textAlign: 'center' }}>
              <div className='col-sm-12'>
                <h4>CÔNG TY TNHH CGV VIỆT NAM</h4>
                <h5>HÀ NỘI</h5>
                <br />
                <h2>{ticketInfo.movie}</h2>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-sm-6'>
                <h3>
                  {moment(ticketInfo.premiere).format('HH:mm DD/MM/YYYY')}
                </h3>
              </div>
              <div className='col-sm-6'>
                <h3>
                  {moment(ticketInfo.premiere).add(ticketInfo.movie_time,'minutes').format('HH:mm DD/MM/YYYY')}
                </h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                {/* <h1>Ha Noi</h1> */}
                <h4>KHACH HANG: {ticketInfo.fullName}</h4>
                <h4>MA CODE : {ticketInfo.code.toUpperCase()}</h4>
                <h4>NGAY DAT VE: {moment(ticketInfo.created_date).format('DD/MM/YYYY')}</h4>
                <h4>GIA VE: {ticketInfo.value.toLocaleString()} VND</h4>
                <h4>Da bao gom 5% thue VAT</h4>
              </div>
              <div className='col-sm-6'>
                <h2>RAP: {ticketInfo.cinema}</h2>
                <h2>
                  PHONG: {ticketInfo.room} / {ticketInfo.position.join(', ')}
                </h2>
                {/* <h3>(Ghe/Rap)</h3> */}
                {/* <h4>Da thanh toan !</h4> */}
              </div>
            </div>
            <hr />
            <h1 style={{ textAlign: 'center' }}>WWW.CGV.COM</h1>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default TicketList;
