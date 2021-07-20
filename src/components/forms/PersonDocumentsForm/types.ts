import {
  PassportInfoType,
  PassportPolicyType,
  PassportInfoTypeDeleted,
  PassportPolicyTypeDeleted
} from "../wizards/RegCardWizard/pages/PassportGeneral/types";

export default interface FormState {
  documents: PassportInfoType[];
  policies: PassportPolicyType[];
  documentsDeleted: PassportInfoTypeDeleted[];
  policiesDeleted: PassportPolicyTypeDeleted[];
}
