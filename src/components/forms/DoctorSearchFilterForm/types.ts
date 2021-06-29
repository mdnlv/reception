import PatientsSearchFiltersType from "../../../reduxStore/slices/patients/types";

export interface FormProps {
  onClose?(): void;
  onClearForm?(): void;
  onSubmit?(): void;
}

type PartialFormState = Partial<PatientsSearchFiltersType>;

export default PartialFormState;
