import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "http://192.168.0.3:5019",
});

export default apiInstance;
