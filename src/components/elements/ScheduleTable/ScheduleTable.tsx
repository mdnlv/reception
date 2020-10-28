import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import ScheduleTableList from './components/ScheduleTableList/ScheduleTableList';
import data from './data';
import './styles.scss';
import ScheduleTableHeader from './components/ScheduleTableHeader/ScheduleTableHeader';
import ScheduleTimeline from './components/ScheduleTimeline/ScheduleTimeline';
import { addDays, eachDayOfInterval } from 'date-fns';

export type ScheduleTableModeType = 'day' | 'week';

export interface ActionItems {
  [k: string]:
    | {
        name: string;
        clientId: number;
      }
    | undefined;
}

export interface ScheduleListItem {
  planned: number;
  id: number;
  personName: string;
  items: ActionItems;
}

interface ScheduleTableProps {}

const ScheduleTable: React.FC<ScheduleTableProps> = (props) => {
  const [mode, setMode] = useState<ScheduleTableModeType>('day');
  const [selected, setSelected] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rangeWeekDate, setRangeWeek] = useState(addDays(new Date(), 14));

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
          list={data}
          mode={mode}
        />
      </Row>
    </div>
  );
};

export default ScheduleTable;
