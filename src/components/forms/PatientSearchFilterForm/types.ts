import { PatientsSearchFiltersType } from '../../../reduxStore/slices/patients/patientsSlice';

interface FormState extends PatientsSearchFiltersType {
  personAgeFrom: undefined;
  personAgeTo: undefined;
  birthMonth: undefined;
  birthYear: undefined;
}

export interface FormProps {
  onClose?(): void;
  onClearForm?(): void;
  onSubmit?(): void;
}

type PartialFormState = Partial<FormState>;

export default PartialFormState;
