import axiosClient from '.';

const request = {
  getMovies() {
    return axiosClient.get('/movies');
  },

  getCategoriesByMovieId(movieId) {
    return axiosClient.get(`/movies/${movieId}/categories`);
  },
  getCategories() {
    return axiosClient.get('/movies/categories');
  },
  getLanguages() {
    return axiosClient.get('/movies/languages');
  },
  getFormats() {
    return axiosClient.get('/movies/formats');
  },
  getCountries() {
    return axiosClient.get('/movies/countries');
  },
  createMovie(movie) {
    return axiosClient.post('/movies', movie);
  },
  updateMovie(movie) {
    return axiosClient.put('/movies', movie);
  },
  deleteMovie(movieId) {
    return axiosClient.delete('/movies', {
      data: {
        id: movieId,
      },
    });
  },
  getMovieById(movieId) {
    return axiosClient.get(`/movies/${movieId}`);
  },
  getCinemas() {
    return axiosClient.get(`/cinemas`);
  },
  getCinemaById(cinemaId) {
    return axiosClient.get(`/cinemas/${cinemaId}`);
  },
  getCinemaByCityId(cityId) {
    return axiosClient.get(`/cinemas/cinemaByCityId/${cityId}`);
  },
  getCities() {
    return axiosClient.get(`/cinemas/cities`);
  },
  createCinema(cinema) {
    return axiosClient.post('/cinemas', cinema);
  },
  updateCinema(cinema) {
    return axiosClient.put('/cinemas', cinema);
  },
  deleteCinema(cinemaId) {
    return axiosClient.delete('/cinemas', {
      data: {
        id: cinemaId,
      },
    });
  },
  getRoomsByCinemaId(cinemaId) {
    return axiosClient.get(`/cinemas/${cinemaId}/rooms`);
  },
  addRoom(roomName, cinemaId) {
    return axiosClient.post('/cinemas/rooms', {
      roomName,
      cinemaId,
    });
  },
  getCinemaByRoomId(roomId) {
    return axiosClient.get(`/cinemas/rooms/${roomId}`);
  },
  getEmpList() {
    return axiosClient.get('/employees');
  },
  createEmp(emp) {
    return axiosClient.post('/employees', emp);
  },
  getEmpById(empId) {
    return axiosClient.get(`/employees/${empId}`);
  },
  updateEmp(emp) {
    return axiosClient.put('/employees', emp);
  },
  deleteEmp(empId) {
    return axiosClient.delete('/employees', {
      data: {
        id: empId,
      },
    });
  },
  getSchedules() {
    return axiosClient.get('/schedules');
  },
  getSchedulesByCinema(data) {
    return axiosClient.get('/schedules', {
      params: {
        cinemaId: data.cinemaId,
        day: data.day,
        movieId: data.movieId,
      },
    });
  },
  getScheduleById(scheduleId) {
    return axiosClient.get(`/schedules/${scheduleId}`);
  },
  createSchedule(schedule) {
    return axiosClient.post('/schedules', schedule);
  },
  updateSchedule(schedule) {
    return axiosClient.put('/schedules', schedule);
  },
  deleteSchedule(scheduleId) {
    return axiosClient.delete('/schedules', {
      data: {
        id: scheduleId,
      },
    });
  },
  getChairsByScheduleId(scheduleId) {
    return axiosClient.get(`/schedules/chairsByScheduleId/${scheduleId}`);
  },
  getTimeTypeSchedule(scheduleId) {
    return axiosClient.get(`/schedules/timeTypeSchedule/${scheduleId}`);
  },
  getAllChairs() {
    return axiosClient.get(`/schedules/allChairs`);
  },
  bookingChairs(data) {
    return axiosClient.post(`/schedules/bookingChairs`, data);
  },
  getAmount({ date_type, time_type, format_id }) {
    return axiosClient.get(`/schedules/amount`, {
      params: { date_type, time_type, format_id },
    });
  },
  getReport(fromDate, toDate, movieId) {
    return axiosClient.get(`/schedules/report`, {
      params: { fromDate, toDate, movieId },
    });
  },
  getTicketByCode(code) {
    return axiosClient.get(`/schedules/ticketByCode`, {
      params: { code },
    });
  },
  receiveTicket(code) {
    return axiosClient.post(`/schedules/receiveTicket`, {
      code,
    });
  },
  login(user) {
    return axiosClient.post('/auth/login', user);
  },

  register(user) {
    return axiosClient.post('/auth/register', user);
  },
  getMyInfo() {
    return axiosClient.get('/auth/information');
  },
  updateMyInfo(user) {
    return axiosClient.put('/auth/information',user);
  },
  getMyTickets() {
    return axiosClient.get('/auth/myTickets');
  },
  getProducts() {
    return axiosClient.get('/products');
  },
  createProduct(product) {
    return axiosClient.post('/products', product);
  },
  getProductById(productId) {
    return axiosClient.get(`/product/${productId}`);
  },
  updateProduct(product) {
    return axiosClient.put('/products', product);
  },
  deleteProduct(productId) {
    return axiosClient.delete('/products', {
      data: {
        id: productId,
      },
    });
  },
};
export default request;
