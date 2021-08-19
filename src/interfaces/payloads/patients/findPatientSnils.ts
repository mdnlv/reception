type FindSnilsParams = Partial<{
  id: number;
  firstName: string;
  lastName: string;
  patrName: string;
  sex: 0 | 1 | null;
  birthDate: string;
}>;

export default FindSnilsParams;
