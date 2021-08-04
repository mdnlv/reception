import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.scss';
import {ListProps} from "./types";
import moment from "moment";
import ListItem from './components/ListItem/ListItem';
import ScheduleAction from './components/ScheduleAction/ScheduleAction';
import { clientAppointment } from "../../../../../reduxStore/slices/scheduleSlice/scheduleSlice";
import { ActionData, ActionPost } from "./components/ScheduleAction/types"
import {RootState} from "../../../../../reduxStore/store";
import { Modal } from 'antd';

const ScheduleTableList: React.FC<ListProps> = ({
  isLoading,
  list,
  onToggleRow,
  selected,
  selectedPerson,
  mode,
  rangeWeekNum,
  loadSchedule,
  currentDate, 
  rangeWeekDate,
  onModeChange,
  startHour,
  endHour,
  speciality,
  actionTicket,
  currentDay,
  setCurrentDay,
  showEmpty,
  groupBy,
  setGroupBy,
  person_tree,
  setSelected,
  searchCount,
  clientTableType
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
  const dispatch = useDispatch();
  const postLoading = useSelector((state: RootState) => state.schedule.postLoading);
  const storeActionData = useSelector((state: RootState) => state.schedule.actionData);
  const errorMessage = useSelector((state: RootState) => state.schedule.errorMessage);
  const errorStatus = useSelector((state: RootState) => state.schedule.errorStatus);
  const spec = useSelector((state: RootState) => state.rb.rbSpeciality);
  const isFiltered = useSelector((state: RootState) => state.person_tree.isFiltered);
  const currentPatient = useSelector((state: RootState) => state.patients.currentPatient);

  const clientTableUpdate = () => {
    dispatch(
      clientAppointment({
      client_id: currentPatient,
      is_past_records: clientTableType == 'pre' ? true: undefined
    }));
  }

  useEffect(() => {
    if(ok && !postLoading) {
      Modal.success({
        title: 'Успешно добавлена запись на приём',
        content: `Пациент ${result.pacient} записан на ${result?.date} в ${result?.time} к врачу ${result?.person} (${result?.speciality && result?.speciality.toLowerCase()}).`,
        okText: 'ОК'
      });
      setOk(false);
      clientTableUpdate();
    }
    if(del && !postLoading) {
      Modal.success({
        title: 'Приём отменён',
        content: `Приём ${actionData?.client} ${actionData?.date} в ${actionData?.time} к врачу ${actionData?.person} (${actionData?.speciality && actionData?.speciality.toLowerCase()}) отменён.`,
        okText: 'ОК'
      });
      setDel(false)
      clientTableUpdate();
    }
    if(edit && !postLoading) { 
      Modal.success({
        title: 'Приём перенесен',
        content: `Приём ${oldData?.client} ${oldData?.date} в ${oldData?.time} к врачу ${oldData?.person} (${actionData?.speciality && actionData?.speciality.toLowerCase()}) перенесён на ${actionData?.date}, ${actionData?.time}.`,
        okText: 'ОК'
      });
      setEdit(false)
      setOldData(undefined)
      clientTableUpdate();
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

  useEffect(()=>{
    if(storeActionData.data)
      if (storeActionData.data.type == 'edit' || storeActionData.data.type == 'delete') 
        showModal(storeActionData)
      else {
        setGroupBy('orgStructure_id')
        let set = new Set(selected.concat(storeActionData.orgs)) 
        setSelected(Array.from(set))
      }
  }, [storeActionData])
/*
  useEffect(()=>{
    function calc(arr: any) {
      let l = selected;
      arr && arr.length > 0 && arr.map((item: any)=>{
        let set = new Set(selected.concat(item.orgStructure_ids));
        console.log(Array.from(set))
        console.log(selected)
        l = Array.from(new Set(l.concat(item.orgStructure_ids)));
        item.child.length > 0 && calc(item.child)
      })      
      setSelected(l)
    }

    function calcS(arr: any) {
      console.log(arr)
      return Object.keys(arr).map((item: any)=>{
        return Number(item)
      })
    }

    if(isFiltered)
      if (groupBy == 'orgStructure_id') {
        calc(person_tree)
      }
      else 
        setSelected(Array.from(calcS(person_tree)))
  }, [person_tree])
*/

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

  const listContent = useMemo(()=>{
    if(groupBy == 'orgStructure_id' && Array.isArray(person_tree)) {
      return person_tree && person_tree.map((item: any) => {
        const toggle = selected.find((sitem) => sitem === item.id) || storeActionData.orgs && storeActionData.orgs.find((sitem: number) => sitem === item.id);
        if(isFiltered && searchCount && searchCount > 0 && searchCount < 6) {     
          setSelected([...selected, item.id])
        }
        
        return (
          <ListItem
            isLoading={isLoading}
            rangeWeekNum={rangeWeekNum}
            mode={mode}
            toggle={isFiltered ? true: !!toggle}
            id={item.id}
            onToggle={onToggleRow}
            key={item.id}
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
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            showEmpty={showEmpty}
            groupBy={groupBy}
            parents={[]}
            showOrg={storeActionData.org}
            open={storeActionData.orgs}
          />
        );
    })
  }  else if(groupBy != 'orgStructure_id' && !Array.isArray(person_tree)) {
    return person_tree && Object.keys(person_tree).map((item: any) => {
      const toggle = selected.find((sitem) => sitem === item.id);
      return (
        <ListItem
          isLoading={isLoading}
          rangeWeekNum={rangeWeekNum}
          mode={mode}
          toggle={!!toggle}
          id={Number(item)}
          onToggle={onToggleRow}
          key={Number(item)}
          name={spec.filter((s:any)=> Number(item) == s.id)[0]? spec.filter((s:any)=> Number(item) == s.id)[0].name : ''}
          child={[]}
          person_list={person_tree[item]}  
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
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          showEmpty={showEmpty}
          groupBy={groupBy}
          parents={[]}
        />
      );
    }); 
  }},[person_tree, list, mode, isLoading, currentDate, rangeWeekNum , selectedPerson])
   
  return <>
    <div className={'schedule-list'}>
      {listContent}
    </div>
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
