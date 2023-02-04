import moment from 'moment';
import React, { useEffect, useState } from 'react';
import request from '../../api/request';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

function History() {
  const [tickets, setTickets] = useState([]);
  console.log('tickets', tickets);

  const getTickets = async () => {
    const result = await request.getMyTickets();
    const listData = result.data;
    const listId = [];
    listData.forEach(t => {
      if (!listId.includes(t.id)) {
        listId.push(t.id);
      }
    });
    const tickets = listId.map(t => {
      const listItem = listData
        .map(l => {
          return {
            ...l,
            position: [l.xPosition + l.yPosition],
          };
        })
        .filter(i => i.id === t)
        .reduce((prev, cur) => {
          const { created_date, id, movie, cinema, premiere, room, value } =
            prev;
          return {
            created_date,
            id,
            movie,
            premiere,
            room,
            cinema,
            value,
            position: [...prev.position, ...cur.position],
          };
        });
      return listItem;
    });
    setTickets(tickets);
  };
  useEffect(() => {
    getTickets();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container' style={{ minHeight: '400px' }}>
        <h2>Danh sách các vé đã đặt</h2>
        <div>
          {tickets.map(ticket => {
            return (
              <div className='panel panel-default'>
                <div className='panel-heading'
                style={{
                    fontSize:'20px',
                    fontWeight:'bold',
                    textTransform:'uppercase'
                }}
                >{ticket.movie}</div>
                <div className='panel-body'>
                  <div>
                    <h4>Mã code: {ticket.id}</h4>
                  </div>
                  <div>
                    <h4>Ngày đặt: {moment(ticket.created_date).format('MM-DD-YYYY')}</h4>
                  </div>
                  <div>
                    <h4>Ngày chiếu: {moment(ticket.premiere).format('HH:mm MM-DD-YYYY')}</h4>
                  </div>
                  <div>
                    <h4>Rạp: {ticket.cinema}</h4>
                  </div>
                  <div>
                    <h4>Phòng: {ticket.room}</h4>
                  </div>
                  <div>
                    <h4>Ghế: {ticket.position.join(', ')}</h4>
                  </div>
                  <div>
                    <h4>Giá vé: {ticket.value.toLocaleString()} VND</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default History;
