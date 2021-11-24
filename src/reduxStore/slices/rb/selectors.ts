import { createSelector } from 'reselect';

import { RootState } from '../../store';

export const detailedOrganisationsSelector = createSelector(
  (state: RootState) => state.rb.rbOrganisations,
  (orgs) =>
    orgs.filter((item) => !item.isInsurer).map((item) => ({
      id: item.id,
      name: item.shortName,
      inn: item.INN,
      ogrn: item.OGRN
    })),
);

export const detailedCMOSelector = createSelector(
  (state: RootState) => state.rb.rbOrganisations,
  (orgs) =>
    orgs
      .filter((item) => item.isInsurer)
      .map((item) => ({
        id: item.id,
        name: item.shortName,
        extraData: item.area,
        inn: item.inn,
        ogrn: item.ogrn
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
export const detailedPersonsFindSelector = createSelector(
  (state: RootState) => state.rb.rbPersons,
  (persons) =>
    persons.map((item) => ({
      id: item.id,
      name: `${item.lastName} ${item.firstName} ${item.patrName}`,
    })),
);

export const detailedDocumentTypesSelector = createSelector(
  (state: RootState) => state.rb.rbDocumentTypes,
  (types) => types,
);

export const detailedPolicyTypesSelector = createSelector(
  (state: RootState) => {
   return state.rb.rbPolicyTypes.filter(
      (item) => item.id === 1 || item.id === 2 || item.id === 4
    )
  },
  (types) => types,
);

export const detailedPolicyKindsSelector = createSelector(
  (state: RootState) => state.rb.rbPolicyKinds,
  (types) => types,
);

export const detailedContactTypesSelector = createSelector(
  (state: RootState) => state.rb.rbContactTypes,
  (types) => types,
);

export const detailedOrgStructureSelector = createSelector(
  (state: RootState) => state.rb.rbOrgStructure,
  (orgs) =>
    orgs.map((item) => ({
      id: item.id,
      name: item.name,
      attachCode: item.attachCode,
      orgId: item.organisation_id,
    })),
);

export const socialLoadingsSelector = createSelector(
  (state: RootState) => state.rb.loading,
  (loadings) => {
    return {
      documents: loadings.documentTypes
    };
  },
);

export const detailedAttachTypesSelector = createSelector(
  (state: RootState) => state.rb.rbAttachTypes,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedDetachmentReasonsSelector = createSelector(
  (state: RootState) => state.rb.rbDetachmentReasons,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedSNILSMissingReasonsSelector = createSelector(
  (state: RootState) => state.rb.rbSNILSMissingReasons,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedPolicyDischargeReason = createSelector(
  (state: RootState) => state.rb.rbPolicyDischargeReasons,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedSocialTypesSelector = createSelector(
  (state: RootState) => state.rb.rbSocialTypes,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name,
      classId: item.class_id,
    })),
);

export const detailedSocialClassesSelector = createSelector(
  (state: RootState) => state.rb.rbSocialClasses,
  (types) =>
    types.map((item) => ({
      id: item.id,
      name: item.name
    })),
);
