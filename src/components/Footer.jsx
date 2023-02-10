import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer-wrapper footer-wrapper--mod'>
      <section className='container'>
        <div className='col-xs-4 col-md-2 footer-nav'>
          <ul className='nav-link'>
            <li>
              <Link href='#' className='nav-link__item'>
                Cities
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Movies
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Trailers
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Rates
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-xs-4 col-md-2 footer-nav'>
          <ul className='nav-link'>
            <li>
              <Link href='#' className='nav-link__item'>
                Coming soon
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Cinemas
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Best offers
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                News
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-xs-4 col-md-2 footer-nav'>
          <ul className='nav-link'>
            <li>
              <Link href='#' className='nav-link__item'>
                Terms of use
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Gallery
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Contacts
              </Link>
            </li>
            <li>
              <Link to='#' className='nav-link__item'>
                Shortcodes
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-xs-12 col-md-6'>
          <div className='footer-info'>
            <p className='heading-special--small'>
              A.Movie
              <br />
              <span className='title-edition'>in the social media</span>
            </p>

            <div className='social'>
              <Link href='#' className='social__variant fa fa-facebook'></Link>
              <Link href='#' className='social__variant fa fa-twitter'></Link>
              <Link href='#' className='social__variant fa fa-vk'></Link>
              <Link href='#' className='social__variant fa fa-instagram'></Link>
              <Link href='#' className='social__variant fa fa-tumblr'></Link>
              <Link href='#' className='social__variant fa fa-pinterest'></Link>
            </div>

            <div className='clearfix'></div>
            <p className='copy'>
              &copy; A.Movie, 2023. All rights reserved. Done by PLT TEAM
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
