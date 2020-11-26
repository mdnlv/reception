import {PersonAddHospitalization} from '../../../components/forms/AdditionalHospitalizationForm/types';
import {PersonAttachment} from '../../../components/forms/AttachmentsForm/types';
import {EmploymentHazardItem, EmploymentItem} from '../../../components/forms/EmploymentForm/types';
import {EtcItem} from '../../../components/forms/EtcForm/types';
import {
  AnthropometricDataItem,
  InspectionItem,
  MedIntoleranceItem,
  PersonAllergyItem,
  PersonFeatureItem,
} from '../../../components/forms/FeaturesForm/types';
import {PersonOffence} from '../../../components/forms/OffencesForm/types';
import {PersonHospitalization} from '../../../components/forms/OutsideHospitalizationForm/types';
import {PersonOutsideId} from '../../../components/forms/OutsideIdentificationForm/types';
import {PassportContactType, PassportPolicyType} from '../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types';
import {
  NamedDoc,
  PassportDoc,
  PolicyDoc,
  SocialStatus as DocsSocialStatus,
} from '../../../components/forms/PersonDocumentsForm/types';
import {PersonLink} from '../../../components/forms/PersonLinksForm/types';
import {PrivilegeInvalidity, PrivilegeItem} from '../../../components/forms/PrivilegesForm/types';
import {SocialStatus, TrustedDoc} from '../../../components/forms/SocialStatusForm/types';
import {PersonViewType} from '../../../components/forms/PersonViewTypeForm/types';
import KladrItem from '../../../types/data/KladrItem';
import KladrStreet from '../../../types/data/KladrStreet';
import {RegistrationCardStateType} from "./types";

const initialState: RegistrationCardStateType = {
  loading: {
    saveNewPatient: false,
    idPatient: false,
  },
  initialFormState: {
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
      docPersonId: '',
    },
    additionalHospitalization: {
      hospitalizations: [] as PersonAddHospitalization[],
    },
    attachments: {
      attachments: [] as PersonAttachment[],
    },
    employment: {
      employment: [] as EmploymentItem[],
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
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
        },
        documentedAddress: {
          isKLADR: true,
          city: '',
          area: '',
          street: '',
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
        },
      },
      contacts: [] as PassportContactType[],
      policyOms: [],
      policyDms: [],
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
  },
  form: {
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
      docPersonId: '',
    },
    additionalHospitalization: {
      hospitalizations: [] as PersonAddHospitalization[],
    },
    attachments: {
      attachments: [] as PersonAttachment[],
    },
    employment: {
      employment: [] as EmploymentItem[],
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
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
        },
        documentedAddress: {
          isKLADR: true,
          city: '',
          area: '',
          street: '',
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
        },
      },
      contacts: [] as PassportContactType[],
      policyOms: [] as PassportPolicyType[],
      policyDms: [] as PassportPolicyType[],
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
          documentedBuffer: {
            isKLADR: true,
            city: '',
            area: '',
            street: '',
            houseNumber: "",
            houseCharacter: "",
            flatNumber: "",
            isDocumentedAddress: false,
            freeInput: '',
          }
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
    foundPolicies: {
      dms: { items: [] as PassportPolicyType[], isLoading: false },
      oms: { items: [] as PassportPolicyType[], isLoading: false },
    },
  },
};

export default initialState;
