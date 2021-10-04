import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "http://reg.vistamed.ru/api/",
});

export default apiInstance;
