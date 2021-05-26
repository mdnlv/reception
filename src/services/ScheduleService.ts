import apiInstance from './api';
import moment from 'moment';

export default {
  fetchSchedule(payload: { id: number; beg_date: string, end_date: string }) {
    //let a = new Date(payload.year, payload.month - 1, 1);
    //let b = new Date(payload.year, payload.month - 1, 15);
    let pid = payload.id;
    return apiInstance.get(
      //`/schedule?person_id=${pid}&beg_date=${moment(a).format('YYYY-MM-DD')}&end_date=${moment(b).format('YYYY-MM-DD')}`,
      `/schedule?orgStructure_id=${pid}&beg_date=${payload.beg_date}&end_date=${payload.end_date}`,
    );
  },

  fetchPersonTree() {
    return apiInstance.get(
      `/person_tree`,
    );
  }
};
 