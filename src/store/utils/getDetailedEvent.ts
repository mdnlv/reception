import EventType from '../../types/data/EventType';
import Person from '../../types/data/Person';
import PatientEvent from '../../types/data/PatientEvent';

export const getPersonName = (person?: Person) => {
  return person
    ? `${person?.lastName} ${person?.firstName} ${person?.patrName}`
    : '';
};

export default function (
  events: PatientEvent[],
  rbEventTypes: EventType[],
  rbPersons: Person[],
) {
  return events.map((item) => ({
    id: item.id,
    type:
      (item.eventTypeId &&
        rbEventTypes.find((eItem) => item.eventTypeId === eItem.id)?.name) ||
      '',
    assignDoc: getPersonName(
      rbPersons.find((pItem) => item.createPersonId === pItem.id),
    ),
    executedDoc: '',
    state: '',
    startDate: item.createDatetime ? new Date(item.createDatetime) : new Date(),
  }));
}
