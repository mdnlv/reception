import {RegistrationCardStateType} from '../../../../reduxStore/slices/registrationCard/types';

export type WizardStateType = Pick<
  RegistrationCardStateType,
  'initialFormState'
>['initialFormState'];

export interface ValidationType {
  personal?: {
    birthDate?: string;
    snils?: string;
  };
  passportGeneral?: {
    passportInfo?: {
      passportType?: string;
      fromDate?: string;
    };
    contacts?: {
      type?: string;
      number?: string;
    }[];
    policyOms?: {
      timeType?: string;
      from?: string;
      to?: string;
      cmo?: string;
      type?: string;
    }
  };
  attachments?: {
    attachments?: {
      type?: string;
      lpu?: string;
      unit?: string;
    }[]
  }
}
