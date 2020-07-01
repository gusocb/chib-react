import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api/workers',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (name, lastName, phoneNumber, birthday, password) => {
    return this.service.post('/signup', {name, lastName, phoneNumber, birthday, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (phoneNumber, password) => {
    return this.service.post('/login', {phoneNumber, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

}

export default AuthService;