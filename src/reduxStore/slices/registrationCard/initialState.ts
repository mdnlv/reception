import {PersonAddHospitalization} from '../../../components/forms/AdditionalHospitalizationForm/types';
import {PersonAttachment, PersonAttachmentDeleted} from '../../../components/forms/AttachmentsForm/types';
import {EmploymentItem, EmploymentItemDeleted} from '../../../components/forms/EmploymentForm/types';
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
import {PersonOutsideId, PersonOutsideIdDeleted} from '../../../components/forms/OutsideIdentificationForm/types';
import {
  PassportContactType,
  PassportPolicyType,
  PassportPolicyTypeDeleted,
  PassportContactTypeDeleted,
  PassportInfoType,
  PassportInfoTypeDeleted
} from '../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types';
import {PersonLink, PersonLinkDeleted} from '../../../components/forms/PersonLinksForm/types';
import {PrivilegeInvalidity, PrivilegeItem} from '../../../components/forms/PrivilegesForm/types';
import {SocialStatus, SocialStatusDeleted} from '../../../components/forms/SocialStatusForm/types';
import {PersonViewType} from '../../../components/forms/PersonViewTypeForm/types';
import KladrItem from '../../../types/data/KladrItem';
import KladrStreet from '../../../types/data/KladrStreet';
import {RegistrationCardStateType} from "./types";

const initialState: RegistrationCardStateType = {
  loading: {
    saveNewPatient: false,
    idPatient: false,
  },
  patientRegId: undefined,
  policiesFoundMessage: false,
  snilsFoundMessage: false,
  initialFormState: {
    personal: {
      code: '',
      firstName: '',
      lastName: '',
      patrName: '',
      birthDate: '',
      birthTime: '',
      height: 0,
      weight: 0,
      sex: 0,
      snils: '',
      docPersonId: '',
      hasImplants: false,
      hasProsthesis: false,
      startCardDate: '',
      hasCard: false,
      onlyTempRegistration: false,
      birthPlace: '',
      isSedentary: false,
      isShiftWorker: false,
    },
    additionalHospitalization: {
      hospitalizations: [] as PersonAddHospitalization[],
    },
    attachments: {
      attachments: [] as PersonAttachment[],
      deleted: [] as PersonAttachmentDeleted[],
    },
    employment: {
      employment: [] as EmploymentItem[],
      deleted: [] as EmploymentItemDeleted[],
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
      deleted: [] as PersonOutsideIdDeleted[],
    },
    passportGeneral: {
      passportInfo: {
        addressRegistration: {
          id: undefined,
          isKLADR: true,
          city: '8600001400000',
          area: '8600000000000',
          street: '',
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
          isVillager: false,
        },
        documentedAddress: {
          id: undefined,
          isKLADR: true,
          city: '8600001400000',
          area: '8600000000000',
          street: '',
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
          isVillager: false,
        },
      },
      contacts: {
        contacts: [] as PassportContactType[],
        deleted: [] as PassportContactTypeDeleted[]
      },
    },
    personDocs: {
      documents: [
        {
          id: undefined,
          passportType: '',
          serialFirst: '',
          serialSecond: '',
          number: '',
          fromDate: '',
          givenBy: '',
        }
      ] as PassportInfoType[],
      policies: [
        {
          id: undefined,
          timeType: '',
          cmoArea: '8600000000000',
          from: '',
          to: '',
          serial: '',
          number: '',
          cmo: '',
          type: '1',
          name: '',
          note: '',
          deleted: 0,
          inn: '',
          enp: '',
          ogrn: '',
          infisCode: '',
          smoShort: '',
        }
      ] as PassportPolicyType[],
      documentsDeleted: [] as PassportInfoTypeDeleted[],
      policiesDeleted: [] as PassportPolicyTypeDeleted[],
    },
    links: {
      directLinks: {
        directLinks: [] as PersonLink[],
        deleted: [] as PersonLinkDeleted[],
      },
      backLinks: {
        backLinks: [] as PersonLink[],
        deleted: [] as PersonLinkDeleted[],
      }
    },
    privileges: {
      invalidity: [] as PrivilegeInvalidity[],
      privileges: [] as PrivilegeItem[],
    },
    quotas: {},
    socialStatus: {
      socialStatus: [] as SocialStatus[],
      deleted: [] as SocialStatusDeleted[],
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
      isSedentary: false,
      isShiftWorker: false,
    },
    additionalHospitalization: {
      hospitalizations: [] as PersonAddHospitalization[],
    },
    attachments: {
      attachments: [] as PersonAttachment[],
      deleted: [] as PersonAttachmentDeleted[],
    },
    employment: {
      employment: [] as EmploymentItem[],
      deleted: [] as EmploymentItemDeleted[],
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
      deleted: [] as PersonOutsideIdDeleted[],
    },
    passportGeneral: {
      passportInfo: {
        addressRegistration: {
          isKLADR: true,
          city: '8600001400000',
          area: '8600000000000',
          street: '',
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
          isVillager: false
        },
        documentedAddress: {
          isKLADR: true,
          city: '8600001400000',
          area: '8600000000000',
          street: '',
          houseNumber: '',
          houseCharacter: '',
          flatNumber: '',
          isDocumentedAddress: false,
          freeInput: '',
          isVillager: false
        },
      },
      contacts: {
        contacts: [] as PassportContactType[],
        deleted: [] as PassportContactTypeDeleted[]
      },
    },
    personDocs: {
      documents: [
        {
          id: undefined,
          passportType: '',
          serialFirst: '',
          serialSecond: '',
          number: '',
          fromDate: '',
          givenBy: '',
        }
      ] as PassportInfoType[],
      policies: [
        {
          id: undefined,
          timeType: '',
          cmoArea: '8600000000000',
          from: '',
          to: '',
          serial: '',
          number: '',
          cmo: '',
          type: '1',
          name: '',
          note: '',
          deleted: 0,
          inn: '',
          enp: '',
          ogrn: '',
          infisCode: '',
          smoShort: '',
        }
      ] as PassportPolicyType[],
      documentsDeleted: [] as PassportInfoTypeDeleted[],
      policiesDeleted: [] as PassportPolicyTypeDeleted[],
    },
    links: {
      directLinks: {
        directLinks: [] as PersonLink[],
        deleted: [] as PersonLinkDeleted[],
      },
      backLinks: {
        backLinks: [] as PersonLink[],
        deleted: [] as PersonLinkDeleted[],
      }
    },
    privileges: {
      invalidity: [] as PrivilegeInvalidity[],
      privileges: [] as PrivilegeItem[],
    },
    quotas: {},
    socialStatus: {
      socialStatus: [] as SocialStatus[],
      deleted: [] as SocialStatusDeleted[],
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
            isVillager: false
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
      item: null,
      isLoading: false
    },
    foundSnils: {
      items: [],
      isLoading: false,
    },
  },
};

export default initialState;
