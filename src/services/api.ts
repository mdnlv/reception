import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "http://p17ext:8096/api",
});

export default apiInstance;
