import { createSelector } from 'reselect';
import { RootState } from '../store';
import { getPersonName } from '../utils/eventsUtils';

const eventsSelector = (state: RootState) => state.patientCard.events;
const rbEventTypes = (state: RootState) => state.rb.rbEventTypes;
const rbPersons = (state: RootState) => state.rb.rbPersons;

export const detailedEventsSelector = createSelector(
  [eventsSelector, rbEventTypes, rbPersons],
  (events, eventTypes, persons) =>
    events.map((item) => ({
      id: item.id,
      type:
        (item.eventTypeId &&
          eventTypes.find((eItem) => item.eventTypeId === eItem.id)?.name) ||
        '',
      assignDoc: getPersonName(
        persons.find((pItem) => item.createPersonId === pItem.id),
      ),
      executedDoc: '',
      state: '',
      startDate: item.createDatetime
        ? new Date(item.createDatetime)
        : new Date(),
    })),
);

export const eventsAppointments = createSelector(
  detailedEventsSelector,
  (events) =>
    events.map((item) => ({
      id: item.id,
      doctor: item.executedDoc,
      type: item.type,
      specialization: '',
      unit: '',
      date: item.startDate,
    })),
);
