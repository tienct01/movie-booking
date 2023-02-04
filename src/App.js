import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Amount from './pages/Amount';
import Information from './pages/Information';
import Error from './pages/Error';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Movie from './pages/admin/Movie';
import CreateMovie from './pages/admin/CreateMovie';
import Cinema from './pages/admin/Cinema';
import CreateCinema from './pages/admin/CreateCinema';
import Report from './pages/admin/Report';
import Employee from './pages/admin/Employee';
import CreateEmployee from './pages/admin/CreateEmployee';
import Schedule from './pages/admin/Schedule';
import CreateSchedule from './pages/admin/CreateSchedule';
import { useSelector } from 'react-redux';
import Booking from './pages/user/Booking';
import BookingChair from './pages/user/BookingChair';
import History from './pages/user/History';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const { currentUser } = useSelector(state => state.auth);
  console.log('currentUser', currentUser);
  return (
    <BrowserRouter>
      <div className='App'>
      <ToastContainer />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/amount' element={<Amount />} />
          <Route path='/information' element={<Information />} />
          <Route path='/error' element={<Error />} />
          <Route path='/movies' element={<MovieList />} />
          <Route path='/movies/:movieId' element={<MovieDetail />} />
          <Route path='/admin/movies' element={<Movie />} />
          <Route path='/admin/movies/create' element={<CreateMovie />} />
          <Route path='/admin/movies/:movieId' element={<CreateMovie />} />
          <Route path='/admin/cinemas' element={<Cinema />} />
          <Route path='/admin/cinemas/create' element={<CreateCinema />} />
          <Route path='/admin/cinemas/:cinemaId' element={<CreateCinema />} />
          <Route path='/admin/employees' element={<Employee />} />
          <Route path='/admin/employees/create' element={<CreateEmployee />} />
          <Route path='/admin/employees/:empId' element={<CreateEmployee />} />
          <Route path='/admin/schedules' element={<Schedule />} />
          <Route path='/admin/schedules/create' element={<CreateSchedule />} />
          <Route
            path='/admin/schedules/:scheduleId'
            element={<CreateSchedule />}
          />
          <Route path='/admin/reports' element={<Report />} />
          <Route path='/booking/:movieId' element={<Booking />} />
          <Route path='/booking-chair/:scheduleId' element={<BookingChair />} />
          <Route path='/history' element={<History />} />
          <Route path='*' element={<Navigate to='/movies' replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
