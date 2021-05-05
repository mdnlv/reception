import {PolicyAttachesType} from "../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types";

export default interface PatientPolicySearchResponse {
  smo: {
    id: number;
    shortName: string;
  };
  policySerial: string;
  policyNumber: string;
  begDate: string;
  endDate: string;
  attachList: PolicyAttachesType[];
}
