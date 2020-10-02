import FeaturesFormState from '../../components/forms/FeaturesForm/types';
import PassportGeneralFormState from '../../components/forms/wizards/RegCardWizard/pages/PassportGeneral/types';
import { FormState as SocialStatusFormState } from '../../components/forms/SocialStatusForm/types';
import AttachmentsFormState from '../../components/forms/AttachmentsForm/types';
import PersonViewTypeFormState from '../../components/forms/PersonViewTypeForm/types';
import LinksFormState from '../../components/forms/PersonLinksForm/types';
import OffencesFormState from '../../components/forms/OffencesForm/types';
import PersonDocsState from '../../components/forms/PersonDocumentsForm/types';
import OutsideIdsFormState from '../../components/forms/OutsideIdentificationForm/types';
import OutsideHospitalizationFormState from '../../components/forms/OutsideHospitalizationForm/types';
import AdditionalHospitalizationFormState from '../../components/forms/AdditionalHospitalizationForm/types';
import EtcFormState from '../../components/forms/EtcForm/types';
import EmploymentFormState from '../../components/forms/EmploymentForm/types';
import PersonPrivilegesFormState from '../../components/forms/PrivilegesForm/types';
import KladrItem from '../../types/data/KladrItem';
import KladrStreet from '../../types/data/KladrStreet';

export const FETCH_REG_CARD = 'FETCH_INFO_BOOKS';
export const FETCH_REG_CARD_SUCCESS = 'FETCH_INFO_BOOKS_SUCCESS';
export const FETCH_REG_CARD_ERROR = 'FETCH_INFO_BOOKS_ERROR';
export const SET_FORM_SECTION = 'SET_FORM_SECTION';

export const FETCH_KLADR = 'FETCH_KLADR_STREET';
export const FETCH_KLADR_ERROR = 'FETCH_KLADR_ERROR';
export const FETCH_KLADR_SUCCESS = 'FETCH_KLADR_SUCCESS';
export const KLADR_LOADING = 'KLADR_LOADING';

export const FETCH_KLADR_STREETS = 'FETCH_KLADR_STREETS';
export const FETCH_KLADR_STREETS_ERROR = 'FETCH_KLADR_STREETS_ERROR';
export const FETCH_KLADR_STREETS_SUCCESS = 'FETCH_KLADR_STREETS_SUCCESS';
export const KLADR_STREETS_LOADING = 'KLADR_STREETS_LOADING';

export const FETCH_KLADR_NESTED = 'FETCH_KLADR_NESTED';
export const FETCH_KLADR_NESTED_ERROR = 'FETCH_KLADR_NESTED_ERROR';
export const FETCH_KLADR_NESTED_SUCCESS = 'FETCH_KLADR_NESTED_SUCCESS';
export const KLADR_NESTED_LOADING = 'KLADR_NESTED_LOADING';

export type KladrDocType = 'documented' | 'registration';
export interface FetchKladrItems {
  id: string;
  type?: KladrDocType;
}
export interface KladrLoadingPayload {
  value: boolean;
  type: KladrDocType;
}
export interface KladrItemsSuccessPayload {
  items: KladrItem[];
  type?: KladrDocType;
}
export interface KladrStreetsSuccessPayload {
  items: KladrStreet[];
  type?: KladrDocType;
}

export interface SetFormAction {
  type: typeof SET_FORM_SECTION;
  payload: RegistrationCardState;
}

export interface FETCH_REG_CARD {
  type: typeof FETCH_REG_CARD;
}

export interface FETCH_REG_CARD_SUCCESS {
  type: typeof FETCH_REG_CARD_SUCCESS;
}

export interface FETCH_REG_CARD_ERROR {
  type: typeof FETCH_REG_CARD_ERROR;
}

export interface FETCH_KLADR {
  type: typeof FETCH_KLADR;
  payload: FetchKladrItems;
}

export interface FETCH_KLADR_ERROR {
  type: typeof FETCH_KLADR_ERROR;
}

export interface FETCH_KLADR_SUCCESS {
  type: typeof FETCH_KLADR_SUCCESS;
  payload: KladrItemsSuccessPayload;
}

export interface FETCH_KLADR_NESTED {
  type: typeof FETCH_KLADR_NESTED;
  payload: FetchKladrItems;
}

export interface FETCH_KLADR_NESTED_ERROR {
  type: typeof FETCH_KLADR_NESTED_ERROR;
}

export interface FETCH_KLADR_NESTED_SUCCESS {
  type: typeof FETCH_KLADR_NESTED_SUCCESS;
  payload: KladrItemsSuccessPayload;
}

export interface FETCH_KLADR_STREETS {
  type: typeof FETCH_KLADR_STREETS;
  payload: FetchKladrItems;
}

export interface FETCH_KLADR_STREETS_ERROR {
  type: typeof FETCH_KLADR_STREETS_ERROR;
}

export interface FETCH_KLADR_STREETS_SUCCESS {
  type: typeof FETCH_KLADR_STREETS_SUCCESS;
  payload: KladrStreetsSuccessPayload;
}

export interface KLADR_LOADING {
  type: typeof KLADR_LOADING;
  payload: KladrLoadingPayload;
}

export interface KLADR_NESTED_LOADING {
  type: typeof KLADR_NESTED_LOADING;
  payload: KladrLoadingPayload;
}

export interface KLADR_STREETS_LOADING {
  type: typeof KLADR_STREETS_LOADING;
  payload: KladrLoadingPayload;
}

export interface RegistrationCardState {
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
    docId: string | number;
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

export type RegistrationCardStateType = SetFormAction;
export type RegCardActionsType =
  | SetFormAction
  | FETCH_REG_CARD
  | FETCH_REG_CARD_SUCCESS
  | FETCH_REG_CARD_ERROR
  | FETCH_KLADR
  | FETCH_KLADR_ERROR
  | FETCH_KLADR_SUCCESS
  | FETCH_KLADR_STREETS
  | FETCH_KLADR_STREETS_ERROR
  | FETCH_KLADR_STREETS_SUCCESS
  | FETCH_KLADR_NESTED
  | FETCH_KLADR_NESTED_ERROR
  | FETCH_KLADR_NESTED_SUCCESS
  | KLADR_LOADING
  | KLADR_NESTED_LOADING
  | KLADR_STREETS_LOADING;
