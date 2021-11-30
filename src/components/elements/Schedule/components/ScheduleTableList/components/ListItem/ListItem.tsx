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
  currentDay,
  setCurrentDay,
  person_list,
  showEmpty,
  groupBy,
  showOrg,
  open,
  key
}) => {
  const [togg, setTogg] = useState(toggle);
  const [personIds, setPersonIds] = useState<number[]>(person_list.map((item: any) => item.id));
  const { isFiltered, query} = useSelector((state: RootState) => state.person_tree);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('query', query);
  //   query ? setTogg(true) : setTogg(false);
  // },[query]);

  // useEffect(() => {
  //   console.log('speciality', speciality);
  // }, [speciality]);

  useEffect(()=>{
    setPersonIds(person_list.map((item: any) => item.id))
  },[person_list])

  useEffect(()=>{
    if(togg) {
      let ids = [id];
      if (!isFiltered && groupBy == 'orgStructure_id') {
        loadSchedule(ids, moment(currentDate).format('YYYY-MM-DD'), moment(rangeWeekDate).format('YYYY-MM-DD'), showEmpty)
      } else {
        console.log('personIds', personIds);
        personIds.length > 0 && dispatch(fetchItems({
          ids: personIds,
          beg_date: moment(currentDate).format('YYYY-MM-DD'),
          end_date: moment(rangeWeekDate).format('YYYY-MM-DD'),
          showEmpty: showEmpty
        }));
      }
      onToggle(id, personIds);
    }
  },[togg]);

  return togg && isLoading
    ? (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
          <Spin/>
        </div>
      )
    :
  (<div key={key}>
    <Row className={'schedule-list__item'}>
      <Col span={4} style={{padding: '4px'}}>
        <div className="item-title" style={{paddingLeft: `${level * 14}px`}}>
          <div
            onClick={() => {
              setTogg(!togg);
              //onToggle(id, personIds);
            }}
            className="item-title__toggle">
            {!togg ? <PlusSquareOutlined /> : <MinusSquareOutlined />}
          </div>
          <div className={'item-title__name'}>{name}</div>
        </div>
      </Col>
      <Col span={20}></Col>

      {togg && groupBy != 'orgStructure_id' && Object.keys(schedule).map((org: any) => Object.values(schedule[org]).filter((s: any)=> id == s.person.speciality_id).map((item: any)=> {
        console.log('biba');
        return(<div className="schedule-list__person">
          <Col span={4} style={{padding: '4px'}}>
            <div className={'item-title__name-person'}>
              {item.person.lastName}{item.person.firstName ? ` ${item.person.firstName[0]}.` : ''}{item.person.patrName ? ` ${item.person.patrName[0]}.` : ''}
            </div>
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
        console.log('boba');
        return(
          <div className="schedule-list__person">
            <Col span={4} style={{padding: '4px'}}>
              <div className={'item-title__name-person'}>{item.person.lastName}{item.person.firstName ? ` ${item.person.firstName[0]}.` : ''}{item.person.patrName ? ` ${item.person.patrName[0]}.` : ''}</div>
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
                  orgId={id}
                  currentDay={currentDay}
                  setCurrentDay={setCurrentDay}
                  isLoading={isLoading}
                />
              )}
            </Col>
          </div>
        )
      })}

      {togg && child.length > 0 && child.map((item, index) => {
        console.log('2 dolboyoba');
        const t = selected.find((sitem: number) => sitem === item.id) || open?.find((sitem: number) => sitem === item.id);
        return (
          <ListItem
            isLoading={isLoading}
            rangeWeekNum={rangeWeekNum}
            mode={mode}
            toggle={t}
            id={item.id}
            onToggle={onToggle}
            key={item.id + index}
            name={item.name}
            child={item.child}
            person_list={item.person_list}
            selected={selected}
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
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            showEmpty={showEmpty}
            groupBy={groupBy}
            open={open}
            showOrg={showOrg}
          />
        )
      })}
    </Row>
  </div>);
};

export default ListItem;
