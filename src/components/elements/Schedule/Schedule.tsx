import ScheduleSearch from './components/ScheduleSearch/ScheduleSearch';
import ScheduleTable from './components/ScheduleTable/ScheduleTable';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxStore/store';
import './styles.scss';

const Schedule: React.FC<any> = (props) => {
  const [tableMode, setTableMode] = useState<'default' | 'search'>('default');
  const dispatch = useDispatch();

  const {
    foundDoctors,
    isSearching,
    currentDoctor,
  } = useSelector((state: RootState) => state.person_tree);

  const onSearchButtonClick = (query: string) => {
  }

  const onSubmitForm = useCallback(() => {
  }, []);

  const onCloseForm = useCallback(() => {
    setTableMode('default');
  }, []);

  const onClearSearch = useCallback(() => {
  }, []);

  const onTableModeChange = useCallback((mode: 'default' | 'search') => {
    setTableMode(mode);
    onOpenSearch();
  }, []);

  const tableDoctorsCount = useMemo(() => {
    if (isSearching && foundDoctors) {
      return foundDoctors.length;
    } else {
      return undefined;
    }
  }, [isSearching, foundDoctors]);

  const onOpenSearch = useCallback(() => {
  }, []);


  return <>
    <ScheduleSearch
      title={'Врачи'}
      mode={tableMode}
      onOpenSearch={onOpenSearch}
      searchCount={tableDoctorsCount}
      onSubmitForm={onSubmitForm}
      onCloseClick={onCloseForm}
      onSearchButtonClick={onSearchButtonClick}
      onTableModeChange={onTableModeChange}
      onClearSearch={onClearSearch}
      person_tree={props.person_tree} 
    >
      <ScheduleTable 
        person_tree={props.person_tree} 
        schedules={props.schedules} 
        loadSchedule={props.loadSchedule} 
        speciality={props.speciality} 
        client={props.client} 
        actionTicket={props.actionTicket} 
      />
    </ScheduleSearch>
  </>
};

export default Schedule;