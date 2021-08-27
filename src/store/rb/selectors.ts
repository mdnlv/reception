import { createSelector } from 'reselect';
import {RootState} from "../../reduxStore/store";

export const detailedOrganisationsSelector = createSelector(
  (state: RootState) => state.rb.rbOrganisations,
  (orgs) =>
    orgs.map((item:{
      id:number;
      shortName:string;
    }) => ({
      id: item.id,
      name: item.shortName,
    })),
);

export const detailedPersonsSelector = createSelector(
  (state: RootState) => state.rb.rbPersons,
  (persons) =>
    //@ts-ignore
    persons.map((item:{
      id:string;
      lastName:string;
      firstName: string;
      patrName: string;
    }) => ({
      id: item.id,
      name: `${item.lastName} ${item.firstName} ${item.patrName}`,
    })),
);

export const detailedPolicyTypes = createSelector(
  (state: RootState) => state.rb.rbPolicyTypes,
  (types) =>
    types.map((item:{
      id: number;
      name: string;
    }) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedPolicyKinds = createSelector(
  (state: RootState) => state.rb.rbPolicyKinds,
  (policyKinds) =>
    policyKinds.map((item:{
      id: number;
      name: string;
    }) => ({
      id: item.id,
      name: item.name,
    })),
);

export const detailedContactTypes = createSelector(
  (state: RootState) => state.rb.rbContactTypes,
  (types) =>
    types.map((item:{
      id: number;
      name: string;
      mask: string;
    }) => ({
      id: item.id,
      name: item.name,
      mask: item.mask,
    })),
);

export const detailedPatientDocumentsTypes = createSelector(
  //@ts-ignore
  (state: RootState) => state.rb.rbPatientDocumentsTypes,
  (types) =>
    types.map((item:{id:number;
    name: string
    }) => ({
      id: item.id,
      name: item.name,
    })),
);
