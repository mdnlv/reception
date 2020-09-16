import { QueryPatientsFilters } from '../../../store/patients/types';

interface FormState extends QueryPatientsFilters {
  personAgeFrom: undefined;
  personAgeTo: undefined;
  birthMonth: undefined;
  birthYear: undefined;
}

type PartialFormState = Partial<FormState>;

export default PartialFormState;
