import {
  FETCH_KLADR_NESTED_SUCCESS,
  FETCH_KLADR_STREETS_SUCCESS,
  FETCH_KLADR_SUCCESS,
  KLADR_LOADING,
  KLADR_NESTED_LOADING,
  KLADR_STREETS_LOADING,
  RegCardActionsType,
  RegistrationCardState,
} from './types';
import moment from 'moment';
import {
  SocialStatus,
  TrustedDoc,
} from '../../components/forms/SocialStatusForm/types';
import { PassportContactType } from '../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types';
import { PersonAttachment } from '../../components/forms/AttachmentsForm/types';
import { PersonViewType } from '../../components/forms/PersonViewTypeForm/types';
import { PersonLink } from '../../components/forms/PersonLinksForm/types';
import { PersonOffence } from '../../components/forms/OffencesForm/types';
import {
  NamedDoc,
  PassportDoc,
  PolicyDoc,
  SocialStatus as DocsSocialStatus,
} from '../../components/forms/PersonDocumentsForm/types';
import { PersonOutsideId } from '../../components/forms/OutsideIdentificationForm/types';
import { PersonHospitalization } from '../../components/forms/OutsideHospitalizationForm/types';
import { PersonAddHospitalization } from '../../components/forms/AdditionalHospitalizationForm/types';
import { EtcItem } from '../../components/forms/EtcForm/types';
import {
  EmploymentHazardItem,
  EmploymentItem,
} from '../../components/forms/EmploymentForm/types';
import {
  PrivilegeInvalidity,
  PrivilegeItem,
} from '../../components/forms/PrivilegesForm/types';
import {
  AnthropometricDataItem,
  InspectionItem,
  MedIntoleranceItem,
  PersonAllergyItem,
  PersonFeatureItem,
} from '../../components/forms/FeaturesForm/types';
import KladrItem from '../../types/data/KladrItem';
import KladrStreet from '../../types/data/KladrStreet';

export const initialState: RegistrationCardState = {
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
    docId: '',
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
      fromDate: new Date(),
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
      from: new Date(),
      to: new Date(),
      serial: '',
      number: '',
      cmo: '',
      type: '',
      name: '',
      note: '',
    },
    policyDms: {
      timeType: '',
      from: new Date(),
      to: new Date(),
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

export function RegistrationCardReducer(
  state = initialState,
  action: RegCardActionsType,
): RegistrationCardState {
  switch (action.type) {
    case 'SET_FORM_SECTION':
      return {
        ...action.payload,
      };
    case FETCH_KLADR_SUCCESS:
      switch (action.payload.type) {
        case 'documented':
          return {
            ...state,
            data: {
              passportGeneral: {
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  kladr: action.payload.items,
                  kladrNested: [],
                  kladrStreets: [],
                },
                ...state.data.passportGeneral,
              },
            },
          };
        case 'registration':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  kladr: action.payload.items,
                  kladrNested: [],
                  kladrStreets: [],
                },
              },
            },
          };
        default:
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  kladr: action.payload.items,
                  kladrNested: [],
                  kladrStreets: [],
                },
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  kladr: action.payload.items,
                  kladrNested: [],
                  kladrStreets: [],
                },
              },
            },
          };
      }
    case FETCH_KLADR_NESTED_SUCCESS:
      switch (action.payload.type) {
        case 'documented':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  kladrNested: action.payload.items,
                  kladrStreets: [],
                },
              },
            },
          };
        case 'registration':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  kladrNested: action.payload.items,
                  kladrStreets: [],
                },
              },
            },
          };
        default:
          return state;
      }
    case FETCH_KLADR_STREETS_SUCCESS:
      switch (action.payload.type) {
        case 'documented':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  kladrStreets: action.payload.items,
                },
              },
            },
          };
        case 'registration':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  kladrStreets: action.payload.items,
                },
              },
            },
          };
        default:
          return state;
      }
    case KLADR_LOADING:
      switch (action.payload.type) {
        case 'documented':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  isKladrLoading: action.payload.value,
                },
              },
            },
          };
        case 'registration':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  isKladrLoading: action.payload.value,
                },
              },
            },
          };
        default:
          return state;
      }
    case KLADR_NESTED_LOADING:
      switch (action.payload.type) {
        case 'documented':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  isKladrNestedLoading: action.payload.value,
                },
              },
            },
          };
        case 'registration':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  isKladrNestedLoading: action.payload.value,
                },
              },
            },
          };
        default:
          return state;
      }
    case KLADR_STREETS_LOADING:
      switch (action.payload.type) {
        case 'documented':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                documentedAddress: {
                  ...state.data.passportGeneral.documentedAddress,
                  isKladrStreetsLoading: action.payload.value,
                },
              },
            },
          };
        case 'registration':
          return {
            ...state,
            data: {
              passportGeneral: {
                ...state.data.passportGeneral,
                addressRegistration: {
                  ...state.data.passportGeneral.addressRegistration,
                  isKladrStreetsLoading: action.payload.value,
                },
              },
            },
          };
        default:
          return state;
      }
    default:
      return state;
  }
}
