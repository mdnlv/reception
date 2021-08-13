import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, eachDayOfInterval } from 'date-fns';
import {Row, Col, Spin} from "antd";
import moment from "moment";

import './styles.scss';
import { ScheduleTableModeType, ScheduleTableProps } from './types';
import {RootState} from "../../../../../reduxStore/store";

import ScheduleTableList from '../ScheduleTableList/ScheduleTableList';
import ScheduleTableHeader from '../ScheduleTableHeader/ScheduleTableHeader';
import ScheduleTimeline from '../ScheduleTimeline/ScheduleTimeline';
import { fetchItems, setDates } from "../../../../../reduxStore/slices/scheduleSlice/scheduleSlice";

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  person_tree, 
  schedules, 
  loadSchedule, 
  speciality,
  actionTicket, 
  showEmpty, 
  groupBy,
  setGroupBy,
  selected,
  selectedPerson,
  onToggleScheduleRow,
  setSelected,
  searchCount,
  clientTableType
}) => {
  const isLoading = useSelector((state: RootState) => state.person_tree.isLoading);
  const isScheduleLoading = useSelector((state: RootState) => state.schedule.isLoading);
  const [mode, setMode] = useState<ScheduleTableModeType>('week');
  const [currentDate, setCurrentDate] = useState(moment().clone().startOf('week').toDate());
  const [rangeWeekDate, setRangeWeek] = useState(addDays(currentDate, 13));
  const [currentDay, setCurrentDay] = useState(new Date());
  const [length, setLength] = useState('week');
  const startHour = 8;
  const endHour = 20;
  const dispatch = useDispatch()
  const { isFiltered } = useSelector((state: RootState) => state.person_tree);
  const storeActionData = useSelector((state: RootState) => state.schedule.actionData);

  useEffect(()=>{
    dispatch(setDates({cd: currentDate, ed: rangeWeekDate}));
  },[rangeWeekDate])

  useEffect(()=>{
    if(selectedPerson.length > 0)
      dispatch(fetchItems({
        ids: selectedPerson,
        beg_date: moment(currentDate).format('YYYY-MM-DD'),
        end_date: moment(rangeWeekDate).format('YYYY-MM-DD'),
        showEmpty: showEmpty
      })); 
  },[showEmpty])

  useEffect(()=>{
    if(storeActionData.data && storeActionData.data.type == 'show') {
      setCurrentDate(moment(storeActionData.date, 'DD.MM.YYYY').clone().startOf('week').toDate())
      setRangeWeek(addDays(moment(storeActionData.date, 'DD.MM.YYYY').clone().startOf('week').toDate(), 13))
      setCurrentDay(moment(storeActionData.date, 'DD.MM.YYYY').toDate())
      setMode('day')
    }
  },[storeActionData])

  const rangeWeekNum = useMemo(() => {
    return (
      eachDayOfInterval({
        start: currentDate,
        end: rangeWeekDate,
      }).length   
    );
  }, [rangeWeekDate]);

  const onScheduleDateChange = (date: Date, endDate: Date, s: number[]) => {
      setCurrentDate(date);
      setRangeWeek(endDate);
      if(selected.length > 0)
        !isFiltered ? loadSchedule(selected, moment(date).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), showEmpty)
        : dispatch(fetchItems({
          ids: selectedPerson,
          beg_date: moment(date).format('YYYY-MM-DD'),
          end_date: moment(endDate).format('YYYY-MM-DD'),
          showEmpty: showEmpty
        }));    
      console.log(selectedPerson)
    };

  const onScheduleModeChange = useCallback(
    (mode: ScheduleTableModeType) => {
      setMode(mode);
    },
    [setMode, mode],
  );

  return (
    <div className={'schedule-table'}>
      { isLoading ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
          <Spin/>
        </div>
      ) : (
        <>
          <Row>
            <Col span={20} offset={4}>
              <ScheduleTableHeader
                mode={mode}
                onModeChange={onScheduleModeChange}
                onDateChange={onScheduleDateChange}
                currentDate={currentDate}
                currentDay={currentDay}
                length={length}
                setLength={setLength}
                selected={selected}
              />
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={4}>
            <ScheduleTimeline
              rangeWeekNum={rangeWeekNum}
              currentDate={currentDate}
              mode={mode}
              startHour={startHour}
              endHour={endHour}
              length={length}
            />
            </Col>
          </Row>
          <Row>
            <ScheduleTableList
              isLoading={isScheduleLoading}
              selected={selected}
              setSelected={setSelected}
              selectedPerson={selectedPerson}
              rangeWeekNum={rangeWeekNum}
              onToggleRow={onToggleScheduleRow}
              list={schedules}
              mode={mode}
              person_tree={person_tree}
              loadSchedule={loadSchedule} 
              currentDate={currentDate}   
              rangeWeekDate={rangeWeekDate}
              onModeChange={onScheduleModeChange}
              startHour={startHour}
              endHour={endHour}
              speciality={speciality}
              actionTicket={actionTicket}
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
              showEmpty={showEmpty}
              groupBy={groupBy}
              setGroupBy={setGroupBy}
              searchCount={searchCount}
              clientTableType={clientTableType}
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default ScheduleTable;