import axios from 'axios';

const apiInstance = axios.create({
  baseURL: "https://reg.vistamed.ru/api",
});

export default apiInstance;
