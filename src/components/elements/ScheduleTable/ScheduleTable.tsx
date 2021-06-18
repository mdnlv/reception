import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, eachDayOfInterval } from 'date-fns';
import {Row, Col, Spin} from "antd";
import moment from "moment";

import './styles.scss';
import { ScheduleTableModeType, ScheduleTableProps } from './types';
import {RootState} from "../../../reduxStore/store";

import ScheduleTableList from './components/ScheduleTableList/ScheduleTableList';
import ScheduleTableHeader from './components/ScheduleTableHeader/ScheduleTableHeader';
import ScheduleTimeline from './components/ScheduleTimeline/ScheduleTimeline';
import { setDates } from "../../../reduxStore/slices/scheduleSlice/scheduleSlice";

const ScheduleTable: React.FC<ScheduleTableProps> = ({person_tree, schedules, loadSchedule, speciality, client, actionTicket}) => {
  const isLoading = useSelector((state: RootState) => state.person_tree.isLoading);
  const isScheduleLoading = useSelector((state: RootState) => state.schedule.isLoading);
  const [mode, setMode] = useState<ScheduleTableModeType>('week');
  const [selected, setSelected] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(moment().clone().startOf('week').toDate());
  const [rangeWeekDate, setRangeWeek] = useState(addDays(currentDate, 13));
  const [currentDay, setCurrentDay] = useState(new Date());
  const [length, setLength] = useState('week');
  const startHour = 8;
  const endHour = 20;
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setDates({cd: currentDate, ed: rangeWeekDate}));
  },[rangeWeekDate])

  const rangeWeekNum = useMemo(() => {
    return (
      eachDayOfInterval({
        start: currentDate,
        end: rangeWeekDate,
      }).length   
    );
  }, [rangeWeekDate]);

  const onToggleScheduleRow = useCallback(
    (id: number) => {
      if (!!selected.find((item) => item === id)) {
        setSelected((prevState) => prevState.filter((item) => item !== id));
      } else {
        setSelected((prevState) => [...prevState, id]);
      }
    },
    [setSelected, selected],
  );

  const onScheduleDateChange = (date: Date, endDate: Date, s: number[]) => {
      setCurrentDate(date);
      setRangeWeek(endDate);
      selected.length > 0 && loadSchedule(selected, moment(date).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));    
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
              client={client}
              actionTicket={actionTicket}
              currentDay={currentDay}
              setCurrentDay={setCurrentDay}
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default ScheduleTable;
