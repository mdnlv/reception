import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';

export interface ListOptionItem {
  id: number;
  name: string;
}

export interface FormProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
  cmoType: ListOptionItem[];
  onFindPolicy(policy: FindPolicyParams, type: 'oms' | 'dms'): void;
  isLoading: boolean;
  isCmoLoading: boolean;
  foundPolicy?: PassportPolicyType | any;
  error?: {
    timeType: string;
    cmo: string;
    type: string;
  }
}
