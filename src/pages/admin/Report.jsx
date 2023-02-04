import React, { useEffect, useState } from 'react';
import request from '../../api/request';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
function Report() {
    const dataFormater = (number) => {
        if(number > 1000000000){
          return (number/1000000000).toString() + 'B';
        }else if(number > 1000000){
          return (number/1000000).toString() + 'M';
        }else if(number > 1000){
          return (number/1000).toString() + 'K';
        }else{
          return number.toString();
        }
      }
  const [movies, setMovies] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [data, setData] = useState({
    fromDate: null,
    toDate: null,
    movieId: null,
  });
  console.log('data', data);
  const handleChange = (name, value) => {
    const newData = { ...data };
    newData[name] = value;
    setData(newData);
  };
  const getMovies = async () => {
    const result = await request.getMovies();
    setMovies(result.data);
  };
  const getReport = async (fromDate, toDate, movieId) => {
    const result = await request.getReport(fromDate, toDate, movieId);
    const response = result.data.map(item => {
      return {
        ...item,
        created_date: moment(item.created_date).format('DD-MM'),
      };
    });
    setReportData(response);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { fromDate, toDate, movieId } = data;
    getReport(fromDate, toDate, movieId);
  };
  useEffect(() => {
    getMovies();
    getReport(null, null, null);
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
                  <li className='breadcrumb-item active'>Báo doanh thu</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            {/* Content */}
            <div>
              <form
                method='get'
                action='/admin/reports'
                className='row'
                onSubmit={handleSubmit}
              >
                <div className='form-group element'>
                  <label htmlFor='start-date'>Ngày bắt đầu:</label>
                  <input
                    name='startDate'
                    type='date'
                    className='form-control'
                    id='start-date'
                    value={data.fromDate}
                    onChange={e => handleChange('fromDate', e.target.value)}
                  />
                </div>
                <div className='form-group element'>
                  <label htmlFor='end-date'>Ngày kết thúc:</label>
                  <input
                    name='endDate'
                    type='date'
                    className='form-control'
                    id='end-date'
                    value={data.toDate}
                    onChange={e => handleChange('toDate', e.target.value)}
                  />
                </div>
                <div className='form-group element'>
                  <label htmlFor='category'>Phim:</label>
                  <select
                    name='category'
                    className='form-control'
                    id='category'
                    value={data.movieId}
                    onChange={e =>
                      handleChange(
                        'movieId',
                        e.target.value !== 'all' ? e.target.value : null
                      )
                    }
                  >
                    <option value='all'>Tất cả</option>
                    {movies.map(movie => {
                      return (
                        <option key={movie.id} value={movie.id}>
                          {movie.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Lọc báo cáo</label>
                  <button
                    className='btn btn-primary form-control'
                    type='submit'
                  >
                    Lọc
                  </button>
                </div>
              </form>
            </div>
            {/* <c:foreach var="report" items="${reports}"> */}
            {/* </c:foreach> */}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Biểu đồ doanh thu</th>
                  {/* <th>Số lượng</th> */}
                </tr>
              </thead>
              {/* <tbody>
                <tr>
                  <td>
                    ${'{'}report.name{'}'}
                  </td>
                  <td>
                    ${'{'}report.count{'}'}
                  </td>
                </tr>
              </tbody> */}
            </table>
            {/* End Content */}
            <BarChart width={800} height={250} data={reportData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='created_date' />
              <YAxis tickFormatter={dataFormater}/>
              <Tooltip formatter={dataFormater}/>
              <Legend />
              <Bar barSize={50} dataKey='value' fill='#82ca9d' name='Doanh thu' />
              {/* <BarChart dataKey='value' fill='#82ca9d' /> */}
            </BarChart>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Report;
