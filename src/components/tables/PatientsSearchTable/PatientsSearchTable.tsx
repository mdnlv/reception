import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearFoundPatients,
  fetchPatients,
  fetchRegPatient,
  fetchQueryPatients,
  setCurrentPatient,
  setIsSearchingPatients,
} from '../../../reduxStore/slices/patients/patientsSlice';
import { RootState } from '../../../reduxStore/store';

import PatientsTable from '../PatientsTable/PatientsTable';
import TableSearchHeader from '../wrappers/TableSearchHeader/TableSearchHeader';

const PatientsSearchTable: React.FC = () => {
  const dispatch = useDispatch();
  //selectors
  const {
    isLoading,
    isLoadingFound,
    patients,
    foundPatients,
    isSearching,
  } = useSelector((state: RootState) => state.patients);
  const {saveNewPatient, idPatient} = useSelector((state: RootState) => state.registrationCard.loading);
  const {patientRegId} = useSelector((state: RootState) => state.registrationCard);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log('patientRegId', patientRegId)
  }, []);

  useEffect(() => {
    if (patientRegId) {
      dispatch(fetchRegPatient(patientRegId));
    } else if (patients.length === 0 || !patients) {
      dispatch(fetchPatients({ limit: 5, offset: 0 }));
    }
  }, [patientRegId]);

  useEffect(() => {
    if (patientRegId) {
      dispatch(setCurrentPatient(patientRegId));
    }
  }, [patientRegId]);

  useEffect(() => {
    dispatch(fetchQueryPatients({query: searchQuery.trim(), limit: 5, offset}))
  }, [offset]);

  const onSearchButtonClick = (query: string) => {
    dispatch(setIsSearchingPatients(true));
    dispatch(fetchQueryPatients({query:query,limit:5}))
  }

  const getTypePatients = useMemo(() => {
    if (!isSearching) {
      return patients;
    } else {
      return foundPatients;
    }
  }, [isSearching, patients, foundPatients]);

  const onSubmitForm = useCallback(() => {
    dispatch(setIsSearchingPatients(true));
  }, []);

  const onClearSearch = useCallback(() => {
    dispatch(setIsSearchingPatients(false));
    dispatch(clearFoundPatients());
  }, []);

  const tablePatientsCount = useMemo(() => {
    if (isSearching && foundPatients) {
      return foundPatients.length;
    } else {
      return undefined;
    }
  }, [isSearching, foundPatients]);

  const tableLoading = useMemo(() => {
    return isSearching && isLoadingFound
      || !isSearching && isLoading
      || saveNewPatient && !patientRegId
      || idPatient;
  }, [isSearching, isLoading, isLoadingFound, saveNewPatient, patientRegId, idPatient]);

  return (
    <TableSearchHeader
      title={'Пациенты'}
      searchQuery={searchQuery}
      searchCount={tablePatientsCount}
      onSearchQuery={setSearchQuery}
      onSubmitForm={onSubmitForm}
      onSearchButtonClick={onSearchButtonClick}
      onClearSearch={onClearSearch}>
      <PatientsTable
        isLoading={tableLoading}
        patients={getTypePatients}
        onChangeOffset={setOffset}
      />
    </TableSearchHeader>
  );
};

export default PatientsSearchTable;
