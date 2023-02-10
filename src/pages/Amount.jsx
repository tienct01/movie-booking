import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Amount() {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h2>BẢNG GIÁ VÉ PHIM 2D TẠI RẠP CGV CINEMA</h2>
        <div className='table-responsive'>
          <table border={1} className='table table-bordered'>
            <thead>
              <tr className='info'>
                <th rowSpan={2} />
                {/* <th colSpan={2}>NGƯỜI LỚN</th> */}
              </tr>
              <tr className='info'>
                <td>Trước 18h</td>
                <td>18h - 22h</td>
              </tr>
            </thead>
            <tbody>
              <tr className='active'>
                <td>Thứ 2, 3, 4, 5, 6</td>
                <td colSpan={2}>Đồng giá 60.000 | VIP: 70.000</td>
                {/* <td rowSpan={2}>40.000</td> */}
              </tr>
              <tr className='active'>
                <td>Thứ 7, CN</td>
                <td>60.000 | VIP: 70.000</td>
                <td>65.000 | VIP: 75.000</td>
              </tr>
              <tr className='active'>
                <td>Ngày lễ</td>
                <td colSpan={3}>70.000 | VIP: 80.000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>BẢNG GIÁ VÉ PHIM 3D TẠI RẠP CGV CINEMA</h2>
        <div className='table-responsive'>
          <table border={1} className='table table-bordered'>
            <thead>
              <tr className='info'>
                <th rowSpan={2} />
                {/* <th colSpan={2}>NGƯỜI LỚN</th> */}
                {/* <th rowSpan={2}>HS - SV, TRẺ EM, NGƯỜI CAO TUỔI</th> */}
              </tr>
              <tr className='info'>
                <td>Trước 18h</td>
                <td>18h - 22h</td>
              </tr>
            </thead>
            <tbody>
              <tr className='active'>
                <td>Thứ 2, 3, 4, 5, 6</td>
                <td colSpan={2}>Đồng giá 70.000 | VIP: 80.000</td>
                {/* <td rowSpan={2}>50.000</td> */}
              </tr>
              <tr className='active'>
                <td>Thứ 7, CN</td>
                <td>70.000 | VIP: 80.000</td>
                <td>75.000 | VIP: 90.000</td>
              </tr>
              <tr className='active'>
                <td>Ngày lễ</td>
                <td colSpan={3}>80.000 | VIP: 95.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Amount;
