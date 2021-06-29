import apiInstance from './api';
import { ActionPost } from '../components/elements/Schedule/types';

export default {
  fetchSchedule(payload: { id: number[]; beg_date: string, end_date: string }) {
    let s =  `/schedule?beg_date=${payload.beg_date}&end_date=${payload.end_date}`
    for(let v of payload.id) {
      s += `&orgStructure_id=${v}`
    }
    return apiInstance.get(s);
  },
  
  fetchItem(payload: { id: number; date: string}) {
    let s =  `/schedule?beg_date=${payload.date}&end_date=${payload.date}&person_id=${payload.id}`
    return apiInstance.get(s);
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
 