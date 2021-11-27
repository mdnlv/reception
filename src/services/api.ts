import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "http://192.168.0.63:58096/api/",
});

export default apiInstance;
