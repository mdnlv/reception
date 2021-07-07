export default interface Organisation {
  id: number;
  fullName: string;
  shortName: string;
  isInsurer: 0 | 1;
  inn: string;
  ogrn: string;
  area?: string;
}
