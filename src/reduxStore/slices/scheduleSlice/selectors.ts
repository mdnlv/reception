import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const detailedSchedules = createSelector(
  (state: RootState) => state.schedule.schedules,
  (schedules) => {

    /*for (const [key, value] of Object.entries(arr[0].schedule)) {
      console.log(`${key}: ${value[0]}`);
    }*/
    /*if(arr[0]) {
      arr = Object.entries(arr[0].schedule).map((item, index) => {

        return {
          id: 0,
          date: item[0],
          planned: item[1][0].planned,
          begTime: item[1][0].begTime,
          endTime: item[1][0].endTime,
          personName: 'test test test',
          items: item[1][0].tickets,
        }
      })
    };*/
    return schedules;
  }


  /* schedules[0].schedule.map((item) => {
      const scheduleItems: Record<
        string,
        { clientId: number; name: string }
      > = {};
      Object.values(item.schedule.items).forEach((item, index) => {
        scheduleItems[index.toString()] = {
          clientId: item.clientInfo.id,
          name: item.clientInfo.lastName + ' ' + item.clientInfo.firstName,
        };
      });
      return {
        id: item.action_id,
        planned: item.schedule.planned,
        begTime: item.schedule.begTime,
        endTime: item.schedule.endTime,
        personName: 'test test test',
        items: scheduleItems,
      };
    })*/
);

export const getSpeciality = createSelector(
  (state: RootState) => state.rb.rbSpecialities,
  (orgs) => {
    let obj = new Object({});
    orgs.map((item) => {
      obj = Object.assign(obj, {[item.id]: item.name});
    });
    return obj;
  }  
);

export const getPost = createSelector(
  (state: RootState) => state.rb.rbPost,
  (orgs) => {
    let obj = new Object({});
    console.log(orgs)
    return orgs;
  }  
);