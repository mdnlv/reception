import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import PatientPolicy from '../../../types/data/PatientPolicy';

export interface ListOptionItem {
  id: number;
  name: string;
}

export interface FormProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
  cmoType: ListOptionItem[];
  onAddPolicy(policy: PassportPolicyType, type: 'oms' | 'dms'): void;
  onFindPolicy(policy: FindPolicyParams, type: 'oms' | 'dms'): void;
  isLoading: boolean;
  isCmoLoading: boolean;
  foundPolicy?: PassportPolicyType;
}
