import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { addDays, eachDayOfInterval } from 'date-fns';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './styles.scss';
import { ScheduleTableModeType, ScheduleTableProps } from './types';

import ScheduleTableList from './components/ScheduleTableList/ScheduleTableList';
import ScheduleTableHeader from './components/ScheduleTableHeader/ScheduleTableHeader';
import ScheduleTimeline from './components/ScheduleTimeline/ScheduleTimeline';

const ScheduleTable: React.FC<ScheduleTableProps> = ({schedules}) => {
  const [mode, setMode] = useState<ScheduleTableModeType>('day');
  const [selected, setSelected] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeWeekDate, setRangeWeek] = useState(addDays(new Date(), 14));

  useEffect(() => {
    console.log(schedules);
  }, [schedules]);

  const rangeWeekNum = useMemo(() => {
    return (
      eachDayOfInterval({
        start: currentDate,
        end: rangeWeekDate,
      }).length - 1
    );
  }, [rangeWeekDate, currentDate]);

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
    (date: Date) => {
      setCurrentDate(date);
    },
    [currentDate, setCurrentDate],
  );

  const onScheduleModeChange = useCallback(
    (mode: ScheduleTableModeType) => {
      setMode(mode);
    },
    [setMode, mode],
  );

  const onNewScheduleItem = useCallback(() => {}, []);

  return (
    <div className={'schedule-table'}>
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
          />
        </Col>
      </Row>
      <Row>
        <ScheduleTableList
          selected={selected}
          rangeWeekNum={rangeWeekNum}
          onToggleRow={onToggleScheduleRow}
          onNewScheduleItem={onNewScheduleItem}
          list={schedules}
          mode={mode}
        />
      </Row>
    </div>
  );
};

export default ScheduleTable;
