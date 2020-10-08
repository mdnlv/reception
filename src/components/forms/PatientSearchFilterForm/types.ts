import { PatientsSearchFiltersType } from '../../../reduxStore/slices/patients/patientsSlice';

interface FormState extends PatientsSearchFiltersType {
  personAgeFrom: undefined;
  personAgeTo: undefined;
  birthMonth: undefined;
  birthYear: undefined;
}

type PartialFormState = Partial<FormState>;

export default PartialFormState;
