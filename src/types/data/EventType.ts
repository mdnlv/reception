export default interface EventType {
  id: number;
  createDatetime: string | null;
  createPersonId: number | null;
  eventTypeId: number | null;
  code: string;
  name: string;
}
