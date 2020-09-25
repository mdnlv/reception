import { createSelector } from 'reselect';
import { RootState } from '../store';
import KladrItem from '../../types/data/KladrItem';

export const detailedInvalidReasonsSelector = createSelector(
  (state: RootState) => state.rb.rbInvalidReasons,
  (reasons) =>
    reasons.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedOrganisationsSelector = createSelector(
  (state: RootState) => state.rb.rbOrganisations,
  (orgs) =>
    orgs.map((item) => ({
      id: item.id,
      name: item.shortName,
    })),
);

export const detailedPersonsSelector = createSelector(
  (state: RootState) => state.rb.rbPersons,
  (persons) =>
    persons.map((item) => ({
      id: item.id,
      name: `${item.lastName} ${item.firstName} ${item.patrName}`,
    })),
);

export const detailedInvalidDocuments = createSelector(
  (state: RootState) => state.rb.rbInvalidDocuments,
  (docs) =>
    docs.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedAccountingSystemSelector = createSelector(
  (state: RootState) => state.rb.rbAccountingSystem,
  (accounts) =>
    accounts.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);
