import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const detailedSchedules = createSelector(
  (state: RootState) => state.schedule.schedules,
  (schedules) => schedules
);

export const detailedSchedule = createSelector(
  (state: RootState) => state.schedule.schedule,
  (schedule) => schedule
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
