import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';
import {ListProps} from "./types";
import moment from "moment";
import ListItem from './components/ListItem/ListItem';
import ScheduleAction from './components/ScheduleAction/ScheduleAction';
import { ActionData, ActionPost } from "./components/ScheduleAction/types"
import {RootState} from "../../../../../reduxStore/store";
import { Modal } from 'antd';

const ScheduleTableList: React.FC<ListProps> = ({
  isLoading,
  list,
  onToggleRow,
  selected,
  mode,
  rangeWeekNum,
  person_tree,
  loadSchedule,
  currentDate, 
  rangeWeekDate,
  onModeChange,
  startHour,
  endHour,
  speciality,
  client,
  actionTicket,
  currentDay,
  setCurrentDay
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [actionData, setActionData] = useState<ActionData | undefined>(undefined);
  const [oldData, setOldData] = useState<ActionData | undefined>(undefined);
  const [edit, setEdit] = useState(false);
  const [ok, setOk] = useState(false);
  const [del, setDel] = useState(false);
  const [result, setResult] = useState({
    pacient: '',
    date: '',
    time: '',
    person: '',
    speciality: ''
  });
  const postLoading = useSelector((state: RootState) => state.schedule.postLoading);
  const errorMessage = useSelector((state: RootState) => state.schedule.errorMessage);
  const errorStatus = useSelector((state: RootState) => state.schedule.errorStatus);

  useEffect(() => {
    if(ok && !postLoading) {
      Modal.success({
        title: 'Успешно добавлена запись на приём',
        content: `Пациент ${result.pacient} записан на ${result?.date} ${result?.time} ко врачу ${result?.person} (${result?.speciality.toLowerCase()}).`,
        okText: 'ОК'
      });
      setOk(false);
    }
    if(del && !postLoading) {
      Modal.success({
        title: 'Приём отменён',
        content: `Приём ${actionData?.client} ${actionData?.date} в ${actionData?.time} ко врачу ${actionData?.person} (${actionData?.speciality.toLowerCase()}) отменён.`,
        okText: 'ОК'
      });
      setDel(false)
    }
    if(edit && !postLoading) { 
      Modal.success({
        title: 'Приём перенесен',
        content: `Приём ${oldData?.client} ${oldData?.date} в ${oldData?.time} ко врачу ${oldData?.person} (${actionData?.speciality.toLowerCase()}) перенесён на ${actionData?.date} в ${actionData?.time}.`,
        okText: 'ОК'
      });
      setEdit(false)
      setOldData(undefined)
    }
  },[postLoading])

  useEffect(() => {
    if(errorStatus) {
      Modal.error({
        title: 'Ошибка',
        content: `Не удалось выполнить действие. Дополнительные сведения: "${errorMessage}".`,
        okText: 'ОК'
      });
      setOk(false);
      setEdit(false);
      setDel(false);
    }
  },[errorStatus, errorMessage])

  const showModal = (data: ActionData) => {
    setActionData(data)
    setIsModalVisible(true)
    setIsModalLoading(false)
  };

  const actTicket = (data: ActionPost, id: number) => {
    if(data.type == 'new') setOk(true);
    if(data.type == 'edit') setEdit(true);
    if(data.type == 'delete') setDel(true);
    actionTicket(data, [id], moment(currentDate).format('YYYY-MM-DD'), moment(rangeWeekDate).format('YYYY-MM-DD'));
    setIsModalLoading(true);
    setIsModalVisible(false);   
  };

  const listContent = useMemo(() => {
    return person_tree.map((item, index) => {
      const toggle = selected.find((sitem) => sitem === item.id);
      return (
        <ListItem
          isLoading={isLoading}
          rangeWeekNum={rangeWeekNum}
          mode={mode}
          toggle={!!toggle}
          id={item.id}
          onToggle={onToggleRow}
          key={item.id + index}
          name={item.name}
          child={item.child}
          person_list={item.person_list}  
          selected={selected}
          level={0} 
          loadSchedule={loadSchedule}
          schedule={list}
          currentDate={currentDate}
          rangeWeekDate={rangeWeekDate}
          onModeChange={onModeChange}
          startHour={startHour}
          endHour={endHour}
          speciality={speciality}
          showModal={showModal}
          client={client}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      );
    })
  }, [list, selected, mode, currentDate, rangeWeekNum, person_tree, isLoading]);

  return <>
    <div className={'schedule-list'}>{listContent}</div>
    {isModalVisible ? <ScheduleAction
      data={actionData}
      loading={isModalLoading}
      visible={isModalVisible}
      setVisible={setIsModalVisible}
      actionTicket={actTicket}
      setOldData={setOldData}
      oldData={oldData}
      postLoading={postLoading}
      edit={edit}
      setResult={setResult}
      speciality={speciality}
    /> : null}
  </>;
};

export default ScheduleTableList;
