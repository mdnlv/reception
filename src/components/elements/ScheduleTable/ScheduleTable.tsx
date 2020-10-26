import React, { useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import ScheduleTableList from './components/ScheduleTableList/ScheduleTableList';
import data from './data';
import './styles.scss';
import ScheduleTableHeader from './components/ScheduleTableHeader/ScheduleTableHeader';
import ScheduleTimeline from './components/ScheduleTimeline/ScheduleTimeline';

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
            onModeChange={onScheduleModeChange}
            onDateChange={onScheduleDateChange}
            currentDate={currentDate}
          />
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={4}>
          <ScheduleTimeline currentDate={currentDate} mode={mode} />
        </Col>
      </Row>
      <Row>
        <ScheduleTableList
          selected={selected}
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
