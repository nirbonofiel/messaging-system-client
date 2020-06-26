import axios from 'axios';

export default axios.create({
  baseURL: 'https://messaging-system-server.herokuapp.com/',
});
