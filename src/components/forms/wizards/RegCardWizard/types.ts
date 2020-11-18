import { RegistrationCardStateType } from '../../../../reduxStore/slices/registrationCard/initialState';

export type WizardStateType = Pick<
  RegistrationCardStateType,
  'initialFormState'
>['initialFormState'];
