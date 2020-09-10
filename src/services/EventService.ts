import apiInstance from './api';

export default {
  fetchPersonEvents(id: number) {
    return apiInstance.get(`/event?client_id=${id}&limit=100`);
  },
};
