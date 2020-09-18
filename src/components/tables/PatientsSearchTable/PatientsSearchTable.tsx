import React, { useCallback, useState } from 'react';
import PatientsTable from '../PatientsTable/PatientsTable';
import TableSearchHeader from '../wrappers/TableSearchHeader/TableSearchHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import {
  queryPatients,
  setCurrentPatient,
} from '../../../store/patients/actions';

interface TableProps {
  onOpenSearch: () => void;
}

const PatientsSearchTable: React.FC<TableProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  //selectors
  const { isLoading, patients, currentPatient } = useSelector(
    (state: RootState) => state.patients,
  );

  function onSearchButtonClick(query: string) {
    dispatch(queryPatients(query));
  }

  function onTableRowClick(id: number) {
    if (id !== currentPatient && id) {
      dispatch(setCurrentPatient(id));
    }
  }

  const onQueryChange = useCallback(
    (query: string) => {
      if (query !== searchQuery) {
        setSearchQuery(query);
      }
    },
    [searchQuery],
  );

  return (
    <TableSearchHeader
      title={'Пациенты'}
      type={'filter'}
      onSearchButtonClick={onSearchButtonClick}
      onOpenSearch={props.onOpenSearch}
      onChangeQuery={onQueryChange}>
      <PatientsTable
        onPatientClick={onTableRowClick}
        isLoading={isLoading}
        patients={patients}
        currentPatient={currentPatient}
      />
    </TableSearchHeader>
  );
};

export default PatientsSearchTable;
