import AdditionalHospitalizationFormState, {
  PersonAddHospitalization,
} from '../../../components/forms/AdditionalHospitalizationForm/types';
import AttachmentsFormState, {
  PersonAttachment,
} from '../../../components/forms/AttachmentsForm/types';
import EmploymentFormState, {
  EmploymentHazardItem,
  EmploymentItem,
} from '../../../components/forms/EmploymentForm/types';
import EtcFormState, { EtcItem } from '../../../components/forms/EtcForm/types';
import FeaturesFormState, {
  AnthropometricDataItem,
  InspectionItem,
  MedIntoleranceItem,
  PersonAllergyItem,
  PersonFeatureItem,
} from '../../../components/forms/FeaturesForm/types';
import OffencesFormState, {
  PersonOffence,
} from '../../../components/forms/OffencesForm/types';
import OutsideHospitalizationFormState, {
  PersonHospitalization,
} from '../../../components/forms/OutsideHospitalizationForm/types';
import OutsideIdsFormState, {
  PersonOutsideId,
} from '../../../components/forms/OutsideIdentificationForm/types';
import PassportGeneralFormState, {
  PassportContactType,
} from '../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types';
import PersonDocsState, {
  NamedDoc,
  PassportDoc,
  PolicyDoc,
  SocialStatus as DocsSocialStatus,
} from '../../../components/forms/PersonDocumentsForm/types';
import LinksFormState, {
  PersonLink,
} from '../../../components/forms/PersonLinksForm/types';
import PersonPrivilegesFormState, {
  PrivilegeInvalidity,
  PrivilegeItem,
} from '../../../components/forms/PrivilegesForm/types';
import {
  FormState as SocialStatusFormState,
  SocialStatus,
  TrustedDoc,
} from '../../../components/forms/SocialStatusForm/types';
import PersonViewTypeFormState, {
  PersonViewType,
} from '../../../components/forms/PersonViewTypeForm/types';
import KladrItem from '../../../types/data/KladrItem';
import KladrStreet from '../../../types/data/KladrStreet';

export interface RegistrationCardStateType {
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
    birthDate: string;
    birthTime: string;
    height: number;
    weight: number;
    snils: string;
    startCardDate: string;
    sex: 0 | 1;
    hasImplants: boolean;
    hasProsthesis: boolean;
    birthPlace: string;
    hasCard: boolean;
    onlyTempRegistration: boolean;
  };
  data: {
    passportGeneral: {
      documentedAddress: {
        kladr: KladrItem[];
        kladrNested: KladrItem[];
        kladrStreets: KladrStreet[];
        isKladrLoading: boolean;
        isKladrNestedLoading: boolean;
        isKladrStreetsLoading: boolean;
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
}

const initialState: RegistrationCardStateType = {
  personal: {
    firstName: '',
    lastName: '',
    patrName: '',
    code: '',
    birthPlace: '',
    birthDate: '',
    birthTime: '',
    height: 0,
    weight: 0,
    snils: '',
    hasImplants: false,
    hasProsthesis: false,
    sex: 0,
    startCardDate: '',
    hasCard: false,
    onlyTempRegistration: false,
  },
  additionalHospitalization: {
    hospitalizations: [] as PersonAddHospitalization[],
  },
  attachments: {
    attachments: [] as PersonAttachment[],
  },
  employment: {
    employments: [] as EmploymentItem[],
    hazardHistory: [] as EmploymentHazardItem[],
  },
  etc: {
    items: [] as EtcItem[],
  },
  features: {
    features: [] as PersonFeatureItem[],
    allergy: [] as PersonAllergyItem[],
    medIntolerance: [] as MedIntoleranceItem[],
    inspections: [] as InspectionItem[],
    anthropometricDate: [] as AnthropometricDataItem[],
  },
  offences: {
    offences: [] as PersonOffence[],
  },
  outsideHospitalization: {
    outsideHospitalization: [] as PersonHospitalization[],
  },
  outsideIdentification: {
    outsideIds: [] as PersonOutsideId[],
  },
  passportGeneral: {
    passportInfo: {
      passportType: '',
      serial: '',
      number: '',
      fromDate: '',
      givenBy: '',
      addressRegistration: {
        isKLADR: true,
        city: '',
        area: '',
        street: '',
        isDocumentedAddress: false,
        freeInput: '',
      },
      documentedAddress: {
        isKLADR: true,
        city: '',
        area: '',
        street: '',
        isDocumentedAddress: false,
        freeInput: '',
      },
    },
    contacts: [] as PassportContactType[],
    policyOms: {
      timeType: '',
      from: '',
      to: '',
      serial: '',
      number: '',
      cmo: '',
      type: '',
      name: '',
      note: '',
    },
    policyDms: {
      timeType: '',
      from: '',
      to: '',
      serial: '234234',
      number: '',
      cmo: '',
      type: '',
      name: '',
      note: '',
    },
  },
  personDocs: {
    idDoc: [] as PassportDoc[],
    policy: [] as PolicyDoc[],
    socialStatus: [] as DocsSocialStatus[],
    namedDoc: [] as NamedDoc[],
  },
  links: {
    directLinks: [] as PersonLink[],
    backLinks: [] as PersonLink[],
  },
  privileges: {
    invalidity: [] as PrivilegeInvalidity[],
    privileges: [] as PrivilegeItem[],
  },
  quotas: {},
  socialStatus: {
    socialStatus: [] as SocialStatus[],
    trustedDoc: [] as TrustedDoc[],
  },
  viewTypes: {
    viewTypes: [] as PersonViewType[],
  },
  data: {
    passportGeneral: {
      documentedAddress: {
        kladr: [] as KladrItem[],
        kladrNested: [] as KladrItem[],
        kladrStreets: [] as KladrStreet[],
        isKladrLoading: false,
        isKladrNestedLoading: false,
        isKladrStreetsLoading: false,
      },
      addressRegistration: {
        kladr: [] as KladrItem[],
        kladrNested: [] as KladrItem[],
        kladrStreets: [] as KladrStreet[],
        isKladrLoading: false,
        isKladrNestedLoading: false,
        isKladrStreetsLoading: false,
      },
    },
  },
};

export default initialState;
