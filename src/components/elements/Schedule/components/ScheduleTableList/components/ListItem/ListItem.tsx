import React, { useState, useEffect } from 'react';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import moment from 'moment';
import {ItemProps} from "./types";
import {Spin} from "antd";

import ScheduleActionsRow from '../../../ScheduleActionsRow/ScheduleActionsRow';
import { RootState } from '../../../../../../../reduxStore/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../../../../../reduxStore/slices/scheduleSlice/scheduleSlice';

const ListItem: React.FC<ItemProps> = ({
  isLoading,
  onToggle,
  toggle,
  name,
  id,
  mode,
  rangeWeekNum,
  child,
  selected,
  selectedPerson,
  level,
  loadSchedule,
  schedule,
  currentDate, 
  rangeWeekDate,
  onModeChange,
  startHour,
  endHour,
  speciality,
  showModal,
  client,
  currentDay,
  setCurrentDay,
  person_list,
  showEmpty,
  groupBy
}) => {
  const [togg, setTogg] = useState(false);
  const [personIds, setPersonIds] = useState<number[]>([]);
  const { isFiltered } = useSelector((state: RootState) => state.person_tree);
  const dispatch = useDispatch();

  useEffect(()=>{
    setPersonIds(person_list.map((item: any) => item.id))
  },[person_list])

  return (<>
    <Row className={'schedule-list__item'}>
      <Col span={4} style={{padding: '4px'}}>
        <div className="item-title" style={{paddingLeft: `${level * 14}px`}}>
          <div onClick={()=> {
              let ids = [id];
              setTogg(!togg);
              (!isFiltered && groupBy == 'orgStructure_id') ? loadSchedule(ids, moment(currentDate).format('YYYY-MM-DD'), moment(rangeWeekDate).format('YYYY-MM-DD'), showEmpty) 
              : personIds.length > 0 && dispatch(fetchItems({
                ids: personIds,
                beg_date: moment(currentDate).format('YYYY-MM-DD'),
                end_date: moment(rangeWeekDate).format('YYYY-MM-DD'),
                showEmpty: showEmpty
              }));
              onToggle(id, personIds);
            }} className="item-title__toggle">
            {!togg ? <PlusSquareOutlined /> : <MinusSquareOutlined />}
          </div>  
          <div className={'item-title__name'}>{name}</div>
        </div>  
      </Col>  
      <Col span={20}></Col>

      {togg && groupBy != 'orgStructure_id' && Object.keys(schedule).map((org: any) => Object.values(schedule[org]).filter((s: any)=> id == s.person.speciality_id).map((item: any)=> {
        return(<div className="schedule-list__person">
          <Col span={4} style={{padding: '4px'}}>
            <div className={'item-title__name-person'}>{item.person.lastName + ' ' + item.person.firstName[0] + '.' + item.person.patrName[0] + '.'}</div>
          </Col>
          <Col span={20}>   
            {isLoading ? (
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Spin/>
              </div>
              ) : (
              <ScheduleActionsRow
                mode={mode}
                rangeWeekNum={rangeWeekNum}
                items={item}
                currentDate={currentDate}   
                rangeWeekDate={rangeWeekDate} 
                onModeChange={onModeChange}
                startHour={startHour}
                endHour={endHour}
                showModal={showModal}
                speciality={speciality[item.person.speciality_id]}
                client={client}
                orgId={Number(org)}
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                isLoading={isLoading}
              />
            )}
          </Col>
        </div>)
      }))}

      {togg && groupBy == 'orgStructure_id' && schedule[id] && Object.values(schedule[id]).map((item)=> {
        return(<div className="schedule-list__person">
          <Col span={4} style={{padding: '4px'}}>
            <div className={'item-title__name-person'}>{item.person.lastName + ' ' + item.person.firstName[0] + '.' + item.person.patrName[0] + '.'}</div>
            <div className={'item-title__spec-person'}>{speciality[item.person.speciality_id]}</div>
          </Col>
          <Col span={20}>   
            {isLoading ? (
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <Spin/>
              </div>
              ) : (
              <ScheduleActionsRow
                mode={mode}
                rangeWeekNum={rangeWeekNum}
                items={item}
                currentDate={currentDate}   
                rangeWeekDate={rangeWeekDate} 
                onModeChange={onModeChange}
                startHour={startHour}
                endHour={endHour}
                showModal={showModal}
                speciality={speciality[item.person.speciality_id]}
                client={client}
                orgId={id}
                currentDay={currentDay}
                setCurrentDay={setCurrentDay}
                isLoading={isLoading}
              />
            )}
          </Col>
        </div>)
      })}

      {togg && child.length > 0 && child.map((item) => {
        return (
          <ListItem
            isLoading={isLoading}
            rangeWeekNum={rangeWeekNum}
            mode={mode}
            toggle={toggle}
            id={item.id}
            onToggle={onToggle}
            key={item.id}
            name={item.name}
            child={item.child}
            person_list={item.person_list}  
            selected={selected} 
            selectedPerson={selectedPerson} 
            level={level+1}
            loadSchedule={loadSchedule}
            schedule={schedule}
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
            showEmpty={showEmpty}
            groupBy={groupBy}
          />
        )
      })}
    </Row>
  </>);
};

export default ListItem;
