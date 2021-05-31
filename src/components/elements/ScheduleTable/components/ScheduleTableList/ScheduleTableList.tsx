import React, { useState, useMemo } from 'react';

import './styles.scss';
import {ListProps} from "./types";
import moment from "moment";
import ListItem from './components/ListItem/ListItem';
import ScheduleAction from './components/ScheduleAction/ScheduleAction';
import { ActionData, ActionPost } from "./components/ScheduleAction/types"

const ScheduleTableList: React.FC<ListProps> = ({
  list,
  onNewScheduleItem,
  onToggleRow,
  selected,
  mode,
  rangeWeekNum,
  person_tree,
  loadSchedule,
  currentDate, 
  rangeWeekDate,
  onDateChange,
  onModeChange,
  startHour,
  endHour,
  speciality,
  client,
  postTicket
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [actionData, setActionData] = useState<ActionData | undefined>(undefined);

  const showModal = (data: ActionData) => {
    setActionData(data)
    setIsModalVisible(true)
  };

  const handleOk = (data: ActionPost) => {
    setIsModalLoading(true);
    postTicket(data);
    setIsModalLoading(false);
    setIsModalVisible(false);
    loadSchedule(68, moment(currentDate).format('YYYY-MM-DD'), moment(rangeWeekDate).format('YYYY-MM-DD'));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const listContent = useMemo(() => {
    return person_tree.map((item, index) => {
      const toggle = selected.find((sitem) => sitem === item.id);
      return (
        <ListItem
          rangeWeekNum={rangeWeekNum}
          mode={mode}
          toggle={!!toggle}
          id={item.id}
          onToggle={onToggleRow}
          key={item.id + index}
          onNewScheduleItem={onNewScheduleItem}
          name={item.name}
          child={item.child}
          person_list={item.person_list}  
          selected={selected}
          level={0} 
          loadSchedule={loadSchedule}
          schedule={list}
          currentDate={currentDate}
          rangeWeekDate={rangeWeekDate}
          onDateChange={onDateChange}
          onModeChange={onModeChange}
          startHour={startHour}
          endHour={endHour}
          speciality={speciality}
          showModal={showModal}
          client={client}
        />
      );
    });
  }, [list, selected, mode, rangeWeekNum, person_tree]);

  return <>
    <div className={'schedule-list'}>{listContent}</div>
    <ScheduleAction
      data={actionData}
      loading={isModalLoading}
      visible={isModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
    />
  </>;
};

export default ScheduleTableList;
