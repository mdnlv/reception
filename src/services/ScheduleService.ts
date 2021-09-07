import apiInstance from './api';

export default {
  fetchPersonTree(payload: {group_by?: 'speciality_id' | 'orgStructure_id'}) {
    let s ='';
    if (payload.group_by) {
      s = '?group_by=' + payload.group_by;
    }
    return apiInstance.get(`/person_tree${s}`);
  },
};
