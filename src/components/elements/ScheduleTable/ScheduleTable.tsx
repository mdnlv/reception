import React, { useCallback, useMemo, useState } from 'react';
import {useSelector} from "react-redux";
import { addDays, eachDayOfInterval } from 'date-fns';
import {Row, Col, Spin} from "antd";

import './styles.scss';
import { ScheduleTableModeType, ScheduleTableProps } from './types';
import {RootState} from "../../../reduxStore/store";

import ScheduleTableList from './components/ScheduleTableList/ScheduleTableList';
import ScheduleTableHeader from './components/ScheduleTableHeader/ScheduleTableHeader';
import ScheduleTimeline from './components/ScheduleTimeline/ScheduleTimeline';

const currentDay = new Date();

const ScheduleTable: React.FC<ScheduleTableProps> = ({person_tree, schedules, loadSchedule, speciality, post, client, actionTicket}) => {
  const isLoading = useSelector((state: RootState) => state.person_tree.isLoading);
  const [mode, setMode] = useState<ScheduleTableModeType>('week');
  const [selected, setSelected] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(currentDay);
  const [rangeWeekDate, setRangeWeek] = useState(addDays(currentDay, 13));
  
  const startHour = 8;
  const endHour = 18;

  const rangeWeekNum = useMemo(() => {
    return (
      eachDayOfInterval({
        start: currentDate,
        end: rangeWeekDate,
      }).length   
    );
  }, [rangeWeekDate]);

  const onRangeWeekChange = useCallback((date: Date) => {
    setRangeWeek(date);
  }, []);

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

  const onScheduleDateChange = useCallback(
    (date?: Date) => {
      date? setCurrentDate(date) : setCurrentDate(currentDay);
    },
    [currentDate, setCurrentDate],
  );

  const onScheduleModeChange = useCallback(
    (mode: ScheduleTableModeType) => {
      setMode(mode);
    },
    [setMode, mode],
  );

  return (
    <div className={'schedule-table'}>
      { isLoading ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <Spin/>
        </div>
      ) : (
        <>
          <Row>
            <Col span={20} offset={4}>
              <ScheduleTableHeader
                mode={mode}
                rangeWeekDate={rangeWeekDate}
                onModeChange={onScheduleModeChange}
                onDateChange={onScheduleDateChange}
                onRangeWeekChange={onRangeWeekChange}
                currentDate={currentDate}
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
            />
            </Col>
          </Row>
          <Row>
            <ScheduleTableList
              selected={selected}
              rangeWeekNum={rangeWeekNum}
              onToggleRow={onToggleScheduleRow}
              list={schedules}
              mode={mode}
              person_tree={person_tree}
              loadSchedule={loadSchedule} 
              currentDate={currentDate}   
              rangeWeekDate={rangeWeekDate}  
              onDateChange={onScheduleDateChange}
              onModeChange={onScheduleModeChange}
              startHour={startHour}
              endHour={endHour}
              speciality={speciality}
              post={post}
              client={client}
              actionTicket={actionTicket}
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default ScheduleTable;
