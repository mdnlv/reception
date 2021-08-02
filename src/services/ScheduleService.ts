import apiInstance from './api';
import { ActionPost } from '../components/elements/Schedule/types';

export default {
  fetchSchedule(token: string, payload: { id: number[]; beg_date: string, end_date: string, showEmpty?: boolean }) {
    let s =  `/schedule?beg_date=${payload.beg_date}&end_date=${payload.end_date}`
    for(let v of payload.id) {
      s += `&orgStructure_id=${v}`
    }
    if(payload.showEmpty) s += `&isShowEmptySchedule=1`;
    return apiInstance.get(
      s,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  fetchItem(token: string, payload: { id: number; date: string}) {
    let s =  `/schedule?beg_date=${payload.date}&end_date=${payload.date}&person_id=${payload.id}`
    return apiInstance.get(
      s,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  fetchItems(token: string, payload: { ids: number[]; beg_date: string, end_date: string, showEmpty?: boolean}) {
    let s =  `/schedule?beg_date=${payload.beg_date}&end_date=${payload.end_date}`
    payload.ids.map((item: number)=>{
      s += `&person_id=${item}`
    })
    if(payload.showEmpty) s += `&isShowEmptySchedule=1`;
    return apiInstance.get(
      s,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  fetchPersonTree(token: string, payload: {group_by?: 'speciality_id' | 'orgStructure_id'}) {
    let s ='';
    if (payload.group_by) {
      s = '?group_by=' + payload.group_by;
    }
    return apiInstance.get(
      `/person_tree${s}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  postPersonTree(
    token: string,
    payload: {
      person_id_list?: [number],
      orgStructure_id?: number,
      post_id?: number,
      speciality_id?: number,
      value?: string,
      group_by?: 'speciality_id' | 'orgStructure_id'
    }) {
    return apiInstance.post(
      `/person_tree`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  fetchDoctors(token: string, payload: {limit: number,offset: number,orgStructure_id: number,post_id: number,speciality_id: number, value?: string}) {
    return apiInstance.post(
      `/person/find`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  actionTicket(token: string, ticket: ActionPost) {
    if(ticket.type == 'new')
      return apiInstance.post(
        `/schedule?user_id=${ticket.user_id}&person_id=${ticket.person_id}&client_id=${ticket.client_id}&action_id=${ticket.action_id}&idx=${ticket.idx}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    if(ticket.type == 'edit')
      return apiInstance.put(
        `/schedule?user_id=${ticket.user_id}&action_id=${ticket.old_action_id}&idx=${ticket.old_idx}&new_action_id=${ticket.action_id}&new_idx=${ticket.idx}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    if(ticket.type == 'delete')
      return apiInstance.delete(
        `/schedule?user_id=${ticket.user_id}&client_id=${ticket.client_id}&action_id=${ticket.action_id}&idx=${ticket.idx}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  },

  clientAppointment(token: string, payload: { client_id: number; beg_date?: string, end_date?: string, is_past_records?: boolean }) {
    let s =  `/schedule/client_appointment?client_id=${payload.client_id}`;
    if(payload.beg_date) s += `&beg_date=${payload.beg_date}`;
    if(payload.end_date) s += `&end_date=${payload.end_date}`;
    if(payload.is_past_records) s += `&is_past_records=1`;
    return apiInstance.get(
      s,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },
};
