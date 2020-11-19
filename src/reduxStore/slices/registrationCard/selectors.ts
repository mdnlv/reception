import { createSelector } from 'reselect';

import { RootState } from '../../store';

export const kladrSelector = createSelector(
  (state: RootState) => state.registrationCard.form.data.passportGeneral,
  (data) => ({
    rbKladrDocumented: data.documentedAddress.kladr,
    rbKladrNestedDocumented: data.documentedAddress.kladrNested,
    rbKladrStreetsDocumented: data.documentedAddress.kladrStreets,
    rbKladrRegistration: data.addressRegistration.kladr,
    rbKladrNestedRegistration: data.addressRegistration.kladrNested,
    rbKladrStreetsRegistration: data.addressRegistration.kladrStreets,
  }),
);

export const kladrLoadingsSelector = createSelector(
  (state: RootState) => state.registrationCard.form.data.passportGeneral,
  (data) => ({
    isLoadingKladrDocumented: data.documentedAddress.isKladrLoading,
    isLoadingKladrNestedDocumented: data.documentedAddress.isKladrNestedLoading,
    isLoadingKladrStreetsDocumented:
      data.documentedAddress.isKladrStreetsLoading,
    isLoadingKladrRegistration: data.addressRegistration.isKladrLoading,
    isLoadingKladrNestedRegistration:
      data.addressRegistration.isKladrNestedLoading,
    isLoadingKladrStreetsRegistration:
      data.addressRegistration.isKladrStreetsLoading,
  }),
);
