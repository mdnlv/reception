import AttachmentsFormState from "../../../components/forms/AttachmentsForm/types";
import PassportGeneralFormState, {
  PassportPolicyType,
  PassportAddressType,
  SnilsFound
} from "../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types";
import PersonDocsState from "../../../components/forms/PersonDocumentsForm/types";
import LinksFormState from "../../../components/forms/PersonLinksForm/types";
import KladrItem from "../../../types/data/KladrItem";
import KladrStreet from "../../../types/data/KladrStreet";

export type KladrDocType = 'documented' | 'registration';

interface InitialRegFormState {
  isUnknown: boolean;
  attachments: AttachmentsFormState;
  passportGeneral: PassportGeneralFormState;
  personDocs: PersonDocsState;
  links: LinksFormState;
  personal: {
    code: string;
    firstName: string;
    lastName: string;
    patrName: string;
    birthDate: Date | string;
    birthTime: string;
    height: number;
    weight: number;
    sex: 0 | 1 | null;
    snils: string;
    SNILSMissingReason: string;
    isShiftWorker: boolean;
    birthPlace: string;
  };
  personalUnknown: {
    addressUnknown: string;
    ageUnknown: string;
  };
}

interface FormState extends InitialRegFormState {
  data: {
    passportGeneral: {
      documentedAddress: {
        kladr: KladrItem[];
        kladrNested: KladrItem[];
        kladrStreets: KladrStreet[];
        isKladrLoading: boolean;
        isKladrNestedLoading: boolean;
        isKladrStreetsLoading: boolean;
        documentedBuffer: PassportAddressType;
      };
      addressRegistration: {
        kladr: KladrItem[];
        kladrNested: KladrItem[];
        kladrStreets: KladrStreet[];
        isKladrLoading: boolean;
        isKladrNestedLoading: boolean;
        isKladrStreetsLoading: boolean;
      };
    };
  };
  foundPolicies: {
    item: PassportPolicyType | null;
    isLoading: boolean;
  };
  foundSnils: {
    items: SnilsFound[];
    isLoading: boolean;
  };
}

export interface RegistrationCardStateType {
  loading: {
    saveNewPatient: boolean;
    idPatient: boolean;
  };
  patientRegId?: number;
  policiesFoundMessage: boolean;
  snilsFoundMessage: boolean;
  initialFormState: InitialRegFormState;
  form: FormState;
}
