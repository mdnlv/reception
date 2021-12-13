import {PersonAttachment, PersonAttachmentDeleted} from '../../../components/forms/AttachmentsForm/types';
import {
  PassportContactType,
  PassportPolicyType,
  PassportPolicyTypeDeleted,
  PassportContactTypeDeleted,
  PassportInfoType,
  PassportInfoTypeDeleted
} from '../../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types';
import {PersonLink, PersonLinkDeleted} from '../../../components/forms/PersonLinksForm/types';
import KladrItem from '../../../types/data/KladrItem';
import KladrStreet from '../../../types/data/KladrStreet';
import {RegistrationCardStateType} from "./types";
import {SocialStatus, SocialStatusDeleted} from "../../../components/forms/SocialStatusForm/types";

const initialState: RegistrationCardStateType = {
  loading: {
    saveNewPatient: false,
    idPatient: false,
  },
  patientRegId: undefined,
  policiesFoundMessage: false,
  docFoundMessage: false,
  initialFormState: {
    isUnknown: false,
    isOperator: window.location.href.includes('user_profile=operator'),
    personal: {
      code: '',
      firstName: '',
      lastName: '',
      patrName: '',
      birthDate: '',
      birthTime: '',
      height: 0,
      weight: 0,
      sex: null,
      snils: '',
      SNILSMissingReason: '',
      isShiftWorker: false,
      birthPlace: '',
    },
    personalUnknown: {
      addressUnknown: '',
      ageUnknown: '',
    },
    attachments: {
      attachments: [] as PersonAttachment[],
      deleted: [] as PersonAttachmentDeleted[],
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
          cancelReason: ''
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
    socialStatus: {
      socialStatus: [] as SocialStatus[],
      deleted: [] as SocialStatusDeleted[],
    },
  },
  form: {
    isUnknown: false,
    isOperator: window.location.href.includes('user_profile=operator'),
    personal: {
      code: '',
      firstName: '',
      lastName: '',
      patrName: '',
      birthDate: '',
      birthTime: '',
      height: 0,
      weight: 0,
      sex: null,
      snils: '',
      SNILSMissingReason: '',
      isShiftWorker: false,
      birthPlace: '',
    },
    personalUnknown: {
      addressUnknown: '',
      ageUnknown: '',
    },
    attachments: {
      attachments: [] as PersonAttachment[],
      deleted: [] as PersonAttachmentDeleted[],
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
          cancelReason: ''
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
    socialStatus: {
      socialStatus: [] as SocialStatus[],
      deleted: [] as SocialStatusDeleted[],
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
    policyBuffer: {
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
      cancelReason: ''
    },
    foundPolicies: {
      item: null,
      isLoading: false
    },
    foundDocs: {
      items: [],
      snils: [],
      isLoading: false,
    },
  },
};

export default initialState;
