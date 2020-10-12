import apiInstance from './api';

export default {
  fetchSchedule(payload: { id: number; year?: number; month?: number }) {
    return apiInstance.get(
      `/schedule?person_id=${payload.id}&year=${payload.year}&month=${payload.month}`,
    );
  },
};
