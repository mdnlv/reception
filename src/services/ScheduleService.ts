import apiInstance from './api';
import { ActionPost } from '../components/elements/Schedule/types';

export default {
  fetchSchedule(payload: { id: number[]; beg_date: string, end_date: string, showEmpty?: boolean }) {
    let s =  `/schedule?beg_date=${payload.beg_date}&end_date=${payload.end_date}`
    for(let v of payload.id) {
      s += `&orgStructure_id=${v}`
    }
    if(payload.showEmpty) s += `&isShowEmptySchedule=1`;
    return apiInstance.get(s);
  },
  
  fetchItem(payload: { id: number; date: string}) {
    let s =  `/schedule?beg_date=${payload.date}&end_date=${payload.date}&person_id=${payload.id}`
    return apiInstance.get(s);
  },

  fetchItems(payload: { ids: number[]; beg_date: string, end_date: string, showEmpty?: boolean}) {
    let s =  `/schedule?beg_date=${payload.beg_date}&end_date=${payload.end_date}`
    payload.ids.map((item: number)=>{
      s += `&person_id=${item}`
    })
    if(payload.showEmpty) s += `&isShowEmptySchedule=1`;
    return apiInstance.get(s);
  },

  fetchPersonTree(payload: {group_by?: 'speciality_id' | 'orgStructure_id'}) {
    let s ='';
    if (payload.group_by) {
      s = '?group_by=' + payload.group_by;
    }
    return apiInstance.get(
      `/person_tree${s}`,
    );
  },

  postPersonTree(payload: {person_id_list?: [number], orgStructure_id?: number, post_id?: number, speciality_id?: number, value?: string, group_by?: 'speciality_id' | 'orgStructure_id'}) {
    return apiInstance.post(
      `/person_tree`, payload
    );
  },

  fetchDoctors(payload: {limit: number,offset: number,orgStructure_id: number,post_id: number,speciality_id: number, value?: string}) {
    return apiInstance.post(`/person/find`, payload);
  },

  actionTicket(ticket: ActionPost) {
    if(ticket.type == 'new')
      return apiInstance.post(`/schedule?user_id=${ticket.user_id}&person_id=${ticket.person_id}&client_id=${ticket.client_id}&action_id=${ticket.action_id}&idx=${ticket.idx}`);
    if(ticket.type == 'edit')
      return apiInstance.put(`/schedule?user_id=${ticket.user_id}&action_id=${ticket.old_action_id}&idx=${ticket.old_idx}&new_action_id=${ticket.action_id}&new_idx=${ticket.idx}`);
    if(ticket.type == 'delete') 
      return apiInstance.delete(`/schedule?user_id=${ticket.user_id}&client_id=${ticket.client_id}&action_id=${ticket.action_id}&idx=${ticket.idx}`);
  },

  clientAppointment(payload: { client_id: number; beg_date?: string, end_date?: string, is_past_records?: boolean }) {
    let s =  `/schedule/client_appointment?client_id=${payload.client_id}`;
    if(payload.beg_date) s += `&beg_date=${payload.beg_date}`;
    if(payload.end_date) s += `&end_date=${payload.end_date}`;
    if(payload.is_past_records) s += `&is_past_records=1`;
    return apiInstance.get(s);
  },
};
 