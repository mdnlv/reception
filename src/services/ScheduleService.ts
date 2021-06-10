import apiInstance from './api';
import { ActionPost } from '../components/elements/ScheduleTable/types';

export default {
  fetchSchedule(payload: { id: number[]; beg_date: string, end_date: string }) {
    //let a = new Date(payload.year, payload.month - 1, 1);
    //let b = new Date(payload.year, payload.month - 1, 15);
    let pid = payload.id;
    let s =  `/schedule?beg_date=${payload.beg_date}&end_date=${payload.end_date}`
    for(let v of pid) {
      s += `&orgStructure_id=${v}`
    }
    return apiInstance.get(
      //`/schedule?person_id=${pid}&beg_date=${moment(a).format('YYYY-MM-DD')}&end_date=${moment(b).format('YYYY-MM-DD')}`,
      s,
    );
  },

  fetchPersonTree() {
    return apiInstance.get(
      `/person_tree`,
    );
  },

  actionTicket(ticket: ActionPost) {
    if(ticket.type == 'new')
      return apiInstance.post(`/schedule?user_id=${ticket.user_id}&person_id=${ticket.person_id}&client_id=${ticket.client_id}&action_id=${ticket.action_id}&idx=${ticket.idx}`);
    if(ticket.type == 'edit')
      return apiInstance.put(`/schedule?user_id=${ticket.user_id}&action_id=${ticket.old_action_id}&idx=${ticket.old_idx}&new_action_id=${ticket.action_id}&new_idx=${ticket.idx}`);
    if(ticket.type == 'delete') 
      return apiInstance.delete(`/schedule?user_id=${ticket.user_id}&client_id=${ticket.client_id}&action_id=${ticket.action_id}&idx=${ticket.idx}`);
  }
};
 