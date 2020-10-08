import { createSelector } from 'reselect';
import KladrItem from '../../../types/data/KladrItem';
import { RootState } from '../../store';

function getDetailedKladr(item: KladrItem) {
  return {
    id: item.id,
    name: item.name,
    prefix: item.prefix,
    socr: item.socr,
  };
}

export const kladrSelector = createSelector(
  (state: RootState) => state.registrationCard.data.passportGeneral,
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
  (state: RootState) => state.registrationCard.data.passportGeneral,
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
