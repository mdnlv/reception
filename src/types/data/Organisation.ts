export default interface Organisation {
  id: number;
  fullName: string;
  shortName: string;
  isInsurer: 0 | 1;
  INN: string;
  OGRN: string;
  area?: string;
}
