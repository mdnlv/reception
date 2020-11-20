import {RegistrationCardStateType} from '../../../../reduxStore/slices/registrationCard/types';

export type WizardStateType = Pick<
  RegistrationCardStateType,
  'initialFormState'
>['initialFormState'];
