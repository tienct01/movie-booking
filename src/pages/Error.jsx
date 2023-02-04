import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div>
      <Navbar />
      <div className=''>
      {/* <div className='wrapper'> */}
        <div className='error-wrapper'>
          {/* <div className='error'> */}
          <div className=''>
            <h1 className='error__text'>SORRY, PAGE CAN NOT FOUND</h1>
            <a href='/' className='btn btn-md btn--warning'>
              return to homepage
            </a>
          </div>
        </div>
        <div className='copy-bottom'>
          <p className='copy'>
            © A.Movie, 2023. All rights reserved. Done by Olia Gozha
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Error;
