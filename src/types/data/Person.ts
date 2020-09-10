export default interface Person {
  id: number;
  createDatetime: string;
  createPersonId: number;
  modifyDatetime: string;
  modifyPersonId: number;
  code: string;
  lastName: string;
  firstName: string;
  patrName: string;
  postId: number | null;
  specialityId: number | null;
}
