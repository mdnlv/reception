import { RootState } from '../../store';
import { createSelector } from 'reselect';

export const detailedSchedules = createSelector(
  (state: RootState) => state.schedule.schedules,
  (schedules) =>
    schedules.map((item) => {
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
        personName: 'test test test',
        items: scheduleItems,
      };
    }),
);
