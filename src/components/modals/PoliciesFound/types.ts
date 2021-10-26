import {PassportPolicyType} from "../../forms/wizards/RegCardWizard/pages/PassportGeneral/types";
import {ListOptionItem} from "../../forms/PolicyAddForm/types";

export interface ModalProps {
  isVisible: boolean;
  onClose?(): void;
  policy?: PassportPolicyType | null;
  onOk?(): void;
  cmoType: ListOptionItem[];
  policyFoundValues: string[];
  setPolicyFoundValues: (values: string[]) => void;
}

export interface TableItem {
  key: string;
  field: string;
  newValue: string | Date;
}
