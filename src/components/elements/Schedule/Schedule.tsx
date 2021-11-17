import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../reduxStore/store';
import './styles.scss';
import { fetchPersonTree, postFiltersDoctors, setQuery } from '../../../reduxStore/slices/personTree/personTreeSlice';

import ScheduleSearch from './components/ScheduleSearch/ScheduleSearch';
import ScheduleTable from './components/ScheduleTable/ScheduleTable';

const Schedule: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const personTree = useSelector((state:RootState) => state.person_tree.person_tree);
  const isFiltered = useSelector((state: RootState) => state.person_tree.isFiltered);
  const [tableMode, setTableMode] = useState<'default' | 'search'>('default');
  const [showEmpty, setShowEmpty] = useState<boolean>(false);
  const [groupBy, setGroupBy] = useState<'speciality_id' | 'orgStructure_id'>('orgStructure_id');
  const [filter, setFilter] = useState<any>({});
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<number[]>([]);

  const onToggleScheduleRow = useCallback((id: number, person_ids: number[]) => {
    if(!isFiltered) {
      if (!!selected.find((item) => item === id)) {
        setSelected((prevState) => prevState.filter((item) => item !== id));
        person_ids.map((person_id: number) => {setSelectedPerson((prevState) => prevState.filter((item) => item !== person_id))});
      } else {
        setSelected((prevState) => [...prevState, id]);
        setSelectedPerson((prevState) => [...prevState, ...person_ids]);
      }
    } else {
      setSelectedPerson((prevState) => [...prevState, ...person_ids]);
    }
  },[setSelected, selected]);

  const onSearchButtonClick = (query: string) => {
    dispatch(query == '' ?
      fetchPersonTree({group_by: groupBy})
      : postFiltersDoctors({
        value: query,
        group_by: groupBy
      }),
    );
    setSelected([]);
    setSelectedPerson([]);
    if(query == '') setFilter({})
    else setFilter({value: query})
  }

  const onCloseForm = useCallback(() => {
    setTableMode('default');
  }, []);

  const onClearSearch = useCallback(() => {
    dispatch(fetchPersonTree({group_by: groupBy}))
    dispatch(setQuery(''));
    setFilter({})
    setSelected([]);
    setSelectedPerson([]);
    setShowEmpty(false)
  }, [groupBy]);

  useEffect(()=>{
    setSelected([]);
    setSelectedPerson([]);
  }, [groupBy]);

  const onTableModeChange = useCallback((mode: 'default' | 'search') => {
    setTableMode(mode);
    onOpenSearch();
  }, []);

  // Число найденых врачей
  const tableDoctorsCount = useMemo(() => {
    let count = 0;
    function calc(arr: any) {
      arr && arr.length > 0 && arr.map((item: any)=>{
        count += item.person_list.length;
        item.child.length > 0 && calc(item.child)
      })
    }
    function calcS(arr: any) {
      Object.values(arr).map((item: any)=>{
        count += item.length;
      })
    }
    (groupBy == 'orgStructure_id') ?
      calc(personTree) :
      calcS(personTree)
    return count;
  }, [personTree]);

  const onOpenSearch = useCallback(() => {
  }, []);

  return <>
    <ScheduleSearch
      title={'Врачи'}
      mode={tableMode}
      onOpenSearch={onOpenSearch}
      searchCount={tableDoctorsCount}
      onCloseClick={onCloseForm}
      onSearchButtonClick={onSearchButtonClick}
      onTableModeChange={onTableModeChange}
      onClearSearch={onClearSearch}
      person_tree={props.person_tree}
      setShowEmpty={setShowEmpty}
      showEmpty={showEmpty}
      groupBy={groupBy}
      setGroupBy={setGroupBy}
      setFilter={setFilter}
      filter={filter}
      setSelectedPerson={setSelectedPerson}
      setSelected={setSelected}
    >
      <ScheduleTable
        person_tree={props.person_tree}
        schedules={props.schedules}
        loadSchedule={props.loadSchedule}
        speciality={props.speciality}
        actionTicket={props.actionTicket}
        showEmpty={showEmpty}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        selected={selected}
        setSelected={setSelected}
        selectedPerson={selectedPerson}
        searchCount={tableDoctorsCount}
        onToggleScheduleRow={onToggleScheduleRow}
        clientTableType={props.clientTableType}
      />
    </ScheduleSearch>
  </>
};

export default Schedule;
