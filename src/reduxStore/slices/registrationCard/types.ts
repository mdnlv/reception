import AdditionalHospitalizationFormState from "../../../components/forms/AdditionalHospitalizationForm/types";
import AttachmentsFormState from "../../../components/forms/AttachmentsForm/types";
import EmploymentFormState from "../../../components/forms/EmploymentForm/types";
import EtcFormState from "../../../components/forms/EtcForm/types";
import FeaturesFormState from "../../../components/forms/FeaturesForm/types";
import OffencesFormState from "../../../components/forms/OffencesForm/types";
import OutsideHospitalizationFormState from "../../../components/forms/OutsideHospitalizationForm/types";
import OutsideIdsFormState from "../../../components/forms/OutsideIdentificationForm/types";
import PassportGeneralFormState, {
  PassportPolicyType,
  PassportAddressType,
  SnilsFound
} from "../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types";
import PersonDocsState from "../../../components/forms/PersonDocumentsForm/types";
import LinksFormState from "../../../components/forms/PersonLinksForm/types";
import PersonPrivilegesFormState from "../../../components/forms/PrivilegesForm/types";
import {FormState as SocialStatusFormState} from "../../../components/forms/SocialStatusForm/types";
import PersonViewTypeFormState from "../../../components/forms/PersonViewTypeForm/types";
import KladrItem from "../../../types/data/KladrItem";
import KladrStreet from "../../../types/data/KladrStreet";

export type KladrDocType = 'documented' | 'registration';

interface InitialRegFormState {
  additionalHospitalization: AdditionalHospitalizationFormState;
  attachments: AttachmentsFormState;
  employment: EmploymentFormState;
  etc: EtcFormState;
  features: FeaturesFormState;
  offences: OffencesFormState;
  outsideHospitalization: OutsideHospitalizationFormState;
  outsideIdentification: OutsideIdsFormState;
  passportGeneral: PassportGeneralFormState;
  personDocs: PersonDocsState;
  links: LinksFormState;
  privileges: PersonPrivilegesFormState;
  quotas: {};
  socialStatus: SocialStatusFormState;
  viewTypes: PersonViewTypeFormState;
  personal: {
    firstName: string;
    lastName: string;
    patrName: string;
    code: string;
    birthDate: Date | string;
    birthTime: string;
    height: number;
    weight: number;
    snils: string;
    startCardDate: Date | string;
    sex: 0 | 1;
    hasImplants: boolean;
    hasProsthesis: boolean;
    birthPlace: string;
    hasCard: boolean;
    onlyTempRegistration: boolean;
    docPersonId: string;
    isSedentary: boolean;
    isShiftWorker: boolean;
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
