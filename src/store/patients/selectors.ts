import { createSelector } from 'reselect';
import { RootState } from '../store';

const rbEventTypes = (state: RootState) => state.rb.rbEventTypes;
const rbPersons = (state: RootState) => state.rb.rbPersons;
const patients = (state: RootState) => state.patients.patients;

export const currentPatientInfoSelector = createSelector(
  [(state: RootState) => state.patients.currentPatient, patients],
  (currentPatient, patients) =>
    patients.find((item) => item.code === currentPatient),
);
