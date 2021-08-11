import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "http://neftu1:8096/api",
});

export default apiInstance;
