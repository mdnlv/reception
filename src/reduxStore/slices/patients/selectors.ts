import { createSelector } from 'reselect';
import { RootState } from '../../store';

const rbEventTypes = (state: RootState) => state.rb.rbEventTypes;
const rbPersons = (state: RootState) => state.rb.rbPersons;
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
    return patientsRef.find((item) => item.code === currentPatient);
  },
);
