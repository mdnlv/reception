import Person from '../../types/data/Person';

export const getPersonName = (person?: Person) => {
  return person
    ? `${person?.lastName} ${person?.firstName} ${person?.patrName}`
    : '';
};
