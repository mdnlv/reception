import { RegistrationCardState, RegistrationCardStateType } from './types';
import moment from 'moment';
import {
  SocialStatus,
  TrustedDoc,
} from '../../components/forms/SocialStatusForm/types';
import { PassportContactType } from '../../components/forms/PasssportGeneralForm/types';
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

export const initialState: RegistrationCardState = {
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
        city: '',
        area: '',
        street: '',
        isDocumentedAddress: false,
      },
      documentedAddress: {
        city: '',
        area: '',
        street: '',
        isDocumentedAddress: false,
      },
    },
    contacts: [] as PassportContactType[],
    policyOms: {
      timeType: '',
      from: moment(),
      to: moment(),
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
      to: moment(),
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
};

export function RegistrationCardReducer(
  state = initialState,
  action: RegistrationCardStateType,
): RegistrationCardState {
  switch (action.type) {
    case 'SET_FORM_SECTION':
      return {
        ...action.payload,
      };
    default:
      return { ...initialState };
  }
}
