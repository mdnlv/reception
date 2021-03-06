import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearFoundPatients,
  fetchPatients,
  fetchRegPatient,
  fetchQueryPatients,
  setCurrentPatient,
  setIsSearchingPatients,
  setQuery,
} from '../../../reduxStore/slices/patients/patientsSlice';
import { RootState } from '../../../reduxStore/store';
import {TableProps} from "./types";

import PatientsTable from '../PatientsTable/PatientsTable';
import TableSearchHeader from '../wrappers/TableSearchHeader/TableSearchHeader';

const PatientsSearchTable: React.FC<TableProps> = ({onOpenSearch}) => {
  const dispatch = useDispatch();
  //selectors
  const {
    isLoading,
    isLoadingFound,
    patients,
    foundPatients,
    isSearching,
    currentPatient,
    query
  } = useSelector((state: RootState) => state.patients);
  const {saveNewPatient, idPatient} = useSelector((state: RootState) => state.registrationCard.loading);
  const {patientRegId} = useSelector((state: RootState) => state.registrationCard);
  const [tableMode, setTableMode] = useState<'default' | 'search'>('default');
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
    !isSearching && dispatch(fetchQueryPatients({query: query.trim(), limit: 5, offset}))
  }, [offset, isSearching]);

  const onSearchButtonClick = (query: string) => {
    dispatch(setIsSearchingPatients(true));
    dispatch(fetchQueryPatients({query:query,limit:5}))
  }

  const onTableRowClick = (id: number) => {
    if (id !== currentPatient && id) {
      dispatch(setCurrentPatient(id));
    }
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

  const onCloseForm = useCallback(() => {
    setTableMode('default');
  }, []);

  const onClearSearch = useCallback(() => {
    dispatch(setIsSearchingPatients(false));
    dispatch(clearFoundPatients({}));
    dispatch(setQuery(''));
  }, []);

  const onTableModeChange = useCallback((mode: 'default' | 'search') => {
    setTableMode(mode);
    onOpenSearch();
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
      title={'????????????????'}
      onOpenSearch={onOpenSearch}
      mode={tableMode}
      searchQuery={query}
      searchCount={tablePatientsCount}
      onSearchQuery={setQuery}
      onSubmitForm={onSubmitForm}
      onCloseClick={onCloseForm}
      onSearchButtonClick={onSearchButtonClick}
      onTableModeChange={onTableModeChange}
      onClearSearch={onClearSearch}>
      <PatientsTable
        onPatientClick={onTableRowClick}
        isLoading={tableLoading}
        patients={getTypePatients}
        currentPatient={currentPatient}
        onChangeOffset={setOffset}
      />
    </TableSearchHeader>
  );
};

export default PatientsSearchTable;
