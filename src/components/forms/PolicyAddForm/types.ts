import { PassportPolicyType } from '../wizards/RegCardWizard/pages/PassportGeneral/types';
import FindPolicyParams from '../../../interfaces/payloads/patients/findPatientPolicy';
import {PrefixKladrItem} from "../wizards/RegCardWizard/pages/PassportGeneral/sections/AddressRegistration/types";

export interface ListOptionItem {
  id: number;
  name: string;
  extraData?: number | string;
  inn?: string;
  ogrn?: string;
}

export interface FormProps {
  policyKey: 'policyOms' | 'policyDms';
  policyTimeType: ListOptionItem[];
  policyType: ListOptionItem[];
  cmoType: ListOptionItem[];
  cancelType: ListOptionItem[];
  onFindPolicy?: (policy: FindPolicyParams, type: 'oms' | 'dms') => void;
  isLoading: boolean;
  isCmoLoading: boolean;
  foundPolicy?: PassportPolicyType | any;
  error?: {
    timeType: string;
    cmo: string;
    type: string;
  }
  kladr: PrefixKladrItem[];
  policyMask: string;
  setPolicyMask: (policyMask: string) => void;
  isTyping: boolean;
  setTyping: (value: boolean) => void;
}
