import React, { useCallback, useMemo } from 'react';
import { LockOutlined } from '@ant-design/icons';
import Popover from 'antd/lib/popover';
import Descriptions from 'antd/lib/descriptions';
import moment from "moment"
import './styles.scss';
import {ItemProps} from "./types";
import { ActionPost } from "../../types"

const ScheduleActionItem: React.FC<ItemProps> = ({
  info,
  ticket,
  width,
  mode,
  onModeChange,
  onDateChange,
  date,
  showModal,
  person,
  client
}) => {

  const onDayClick = (data: ActionPost)=>{
    if(showModal)
    showModal(  {
      date: date? moment(date).format("DD.MM.YYYY") : '',
      time: ticket? ticket.begDateTime.slice(0,-3) + '-' + ticket.endDateTime.slice(0,-3): '',
      client: (ticket?.client && ticket.client.id)? ticket.client.lastName + ' ' + ticket.client.firstName[0] + '.' + ticket.client.patrName[0] + '.': '',
      person: person? person.fullName : '',
      speciality:  person? person.speciality : '',
      type: "1",
      data: data
    })
  }

  const onWeekClick = useCallback(()=>{
    date? onDateChange(date) : onDateChange();
    onModeChange('day')
  },[])

  const getTypeAction = useMemo(() => {
    const widthStyle = {
      flex: `${width}`
    };

    if(mode=='day' && showModal) {
        if(!ticket) {
          return (
            <div
              style={{ backgroundColor: '#ddd',  ...widthStyle }}
              className={'schedule-action-item'}>
            </div>
          );
        } else if(ticket.client == null) {
          return (
            <Popover
            placement={'bottom'}
            content={
              <Descriptions column={1} className={'action-description'}>
                <Descriptions.Item label={'Время'}>
                {`${ticket.begDateTime.slice(0,-3)} - ${ticket.endDateTime.slice(0,-3)}`}
                </Descriptions.Item>
              </Descriptions>
            }>
              <div
                style={{ backgroundColor: '#7fd3fd', cursor: 'pointer', ...widthStyle }}
                className={'schedule-action-item'}
                onClick={()=>{onDayClick({action_id: info? info.action_id : 0, idx:  ticket.idx, client_id: (ticket.client && ticket.client.id)? ticket.client.id : -1, person_id:  person? person.id : 0, user_id: 614, index: ticket? ticket.index: ''})}}
              ></div>
            </Popover>
          );
        } else if(ticket.client != null) {
          return (
            <Popover
            placement={'bottom'}
            content={
              <Descriptions column={1} className={'action-description'}>
                <Descriptions.Item label={'Время '}>
                {`${ticket.begDateTime.slice(0,-3)} - ${ticket.endDateTime.slice(0,-3)}`}
                </Descriptions.Item>
                <Descriptions.Item label={'Записан'}>
                  {ticket.client.lastName + ' ' + ticket.client.firstName[0] + '.' + ticket.client.patrName[0] + '.'}
                </Descriptions.Item>
              </Descriptions>
            }>
              <div
                style={{ backgroundColor: '#FFBC7D', cursor: 'pointer', ...widthStyle }}
                className={'schedule-action-item'}
                onClick={()=>{onDayClick({action_id: info? info.action_id : 0, idx:  ticket.idx, client_id: (ticket.client && ticket.client.id)? ticket.client.id : -1, person_id:  person? person.id : 0, user_id: 614, index: ticket? ticket.index: ''})}}
              >
              </div>
            </Popover>
          );
        }
      } else if (mode=='week') {
        if(!info) {
          return (
            <div
              style={{ backgroundColor: '#ddd',  ...widthStyle }}
              className={'schedule-action-item'}>
            </div>
          );
        } else if(info.roa) {
          return (
            <div
              style={{ ...widthStyle }}
              className={'schedule-action-item'}>
              <LockOutlined />
            </div>
          );
        } else if(info.busy) {
          return (
            <div
              style={{ backgroundColor: '#FFBC7D', cursor: 'pointer', ...widthStyle }}
              className={'schedule-action-item'}
              onClick={onWeekClick}
            ></div>
          );
        } else if(!info.busy) {
          return (
            <div
              style={{ backgroundColor: '#7fd3fd', cursor: 'pointer', ...widthStyle }}
              className={'schedule-action-item'}
              onClick={onWeekClick}
            ></div>
          );
        }
    }

  }, [width]);

  return <>{getTypeAction}</>;
};

export default ScheduleActionItem;
