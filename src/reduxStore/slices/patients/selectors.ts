import { createSelector } from 'reselect';

import { RootState } from '../../store';
import Patient from "../../../types/data/Patient";

const patients = (state: RootState) => state.patients.patients;
const foundPatients = (state: RootState) => state.patients.foundPatients;

export const currentPatientInfoSelector = createSelector(
  [
    (state: RootState) => state.patients.currentPatient,
    patients,
    foundPatients,
    (state: RootState) => state.patients.isSearching,
  ],
  (currentPatient, patients, foundPatients, isSearching) => {
    let patientsRef = patients;
    if (isSearching) {
      patientsRef = foundPatients;
    }
    return patientsRef.find((item: Patient) => item.code === currentPatient);
  },
);

export const isSearching = createSelector(
  [(state: RootState) => state.patients.isSearching],
  (isSearching) => isSearching
);
