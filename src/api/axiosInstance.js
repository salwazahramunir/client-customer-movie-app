import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/publics'
});

export default instance;