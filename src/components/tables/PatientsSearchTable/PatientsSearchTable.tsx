import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PatientsTable from '../PatientsTable/PatientsTable';
import TableSearchHeader from '../wrappers/TableSearchHeader/TableSearchHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFoundPatients,
  fetchPatients,
  fetchQueryPatients,
  setCurrentPatient,
  setIsSearchingPatients,
} from '../../../reduxStore/slices/patients/patientsSlice';
import { RootState } from '../../../reduxStore/store';

interface TableProps {
  onOpenSearch: () => void;
}

const PatientsSearchTable: React.FC<TableProps> = (props) => {
  const [tableMode, setTableMode] = useState<'default' | 'search'>('default');
  const dispatch = useDispatch();
  //selectors
  const {
    isLoading,
    isLoadingFound,
    patients,
    foundPatients,
    isSearching,
    currentPatient,
  } = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    if (patients.length === 0 || !patients) {
      dispatch(fetchPatients({ limit: 50, offset: 0 }));
    }
  }, []);

  function onSearchButtonClick(query: string) {
    dispatch(setIsSearchingPatients(true));
    dispatch(fetchQueryPatients(query));
  }

  function onTableRowClick(id: number) {
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
  }, []);

  const onTableModeChange = useCallback((mode: 'default' | 'search') => {
    setTableMode(mode);
  }, []);

  const tablePatientsCount = useMemo(() => {
    if (isSearching && foundPatients) {
      return foundPatients.length;
    } else {
      return undefined;
    }
  }, [isSearching, foundPatients]);

  const tableLoading = useMemo(() => {
    return (isSearching && isLoadingFound) || (!isSearching && isLoading);
  }, [isSearching, isLoading, isLoadingFound]);

  return (
    <TableSearchHeader
      title={'Пациенты'}
      onOpenSearch={props.onOpenSearch}
      mode={tableMode}
      searchCount={tablePatientsCount}
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
      />
    </TableSearchHeader>
  );
};

export default PatientsSearchTable;
