import React, { useState } from 'react';
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import moment from 'moment';
import {ItemProps} from "./types";
import {Spin} from "antd";

import ScheduleActionsRow from '../../../ScheduleActionsRow/ScheduleActionsRow';

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
  client,
  currentDay,
  setCurrentDay
}) => {
  const [togg, setTogg] = useState(false);

  return (<>
    <Row className={'schedule-list__item'}>
      <Col span={4} style={{padding: '4px'}}>
        <div className="item-title" style={{paddingLeft: `${level * 14}px`}}>
          <div onClick={()=> {
              let ids = [id];
              setTogg(!togg)
              loadSchedule(ids, moment(currentDate).format('YYYY-MM-DD'), moment(rangeWeekDate).format('YYYY-MM-DD'));
              onToggle(id);
            }} className="item-title__toggle">
            {!togg ? <PlusSquareOutlined /> : <MinusSquareOutlined />}
          </div>  
          <div className={'item-title__name'}>{name}</div>
        </div>  
      </Col>  
      <Col span={20}></Col>

      {togg && schedule[id] && Object.values(schedule[id]).map((item)=> {
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
              ) : (<ScheduleActionsRow
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
              />
              )}
          </Col>
        </div>)
      })}

      {togg && child.length > 0 && child.map((item, index) => {
        return (
          <ListItem
            isLoading={isLoading}
            rangeWeekNum={rangeWeekNum}
            mode={mode}
            toggle={toggle}
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
            client={client}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
          />
        )
      })}
    </Row>
  </>);
};

export default ListItem;
