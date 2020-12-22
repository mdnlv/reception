import { createSelector } from 'reselect';
import { RootState } from '../store';

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

export const detailedPolicyTypes = createSelector(
  (state: RootState) => state.rb.rbPolicyTypes,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedPolicyKinds = createSelector(
  (state: RootState) => state.rb.rbPolicyKinds,
  (policyKinds) =>
    policyKinds.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedContactTypes = createSelector(
  (state: RootState) => state.rb.rbContactTypes,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
      mask: item.mask,
    })),
);

export const detailedPatientDocumentsTypes = createSelector(
  (state: RootState) => state.rb.rbPatientDocumentsTypes,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);