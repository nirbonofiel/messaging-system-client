import axios from 'axios';

export default axios.create({
  // baseURL: 'https://messaging-system-server.herokuapp.com/',
  baseURL: 'http://127.0.0.1:8000/',
});
